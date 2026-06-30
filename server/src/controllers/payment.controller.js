import crypto from 'crypto';
import Booking from '#models/Booking';
import { ChargerPort } from '#models/Charger';
import { EvStation } from '#models/Station';
import ApiResponse from '#utils/ApiResponse';
import ApiError from '#utils/ApiError';
import asyncHandler from '#utils/asyncHandler';

const generateCheckInCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

const calculateBookingCost = (port, startTime, endTime) => {
  if (port.pricing?.freeCharging) return 0;

  const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
  const sessionFee = port.pricing?.sessionFee || 0;
  const perMinute = port.pricing?.perMinute || 0;
  const perKwh = port.pricing?.perKwh || 0;

  if (perKwh > 0) {
    const estimatedKwh = (port.powerKw || 50) * hours * 0.8;
    return Math.round(sessionFee + estimatedKwh * perKwh);
  }

  return Math.round(sessionFee + hours * 60 * perMinute);
};

export const initiatePayment = asyncHandler(async (req, res) => {
  const { bookingId, paymentMethod } = req.body;

  if (!bookingId || !paymentMethod) {
    throw new ApiError(400, 'Booking ID and payment method are required');
  }

  const booking = await Booking.findById(bookingId).populate('port');
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to pay for this booking');
  }

  if (booking.paymentStatus === 'paid') {
    throw new ApiError(400, 'Booking is already paid');
  }

  if (!['pending', 'confirmed'].includes(booking.status)) {
    throw new ApiError(400, 'Booking cannot be paid in current status');
  }

  const totalCost = booking.totalCost ?? calculateBookingCost(
    booking.port,
    booking.startTime,
    booking.endTime
  );

  booking.totalCost = totalCost;
  booking.paymentMethod = paymentMethod;
  booking.currency = booking.port?.pricing?.currency || 'NPR';
  await booking.save();

  const transactionRef = `TXN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

  res.status(200).json(
    new ApiResponse(200, 'Payment initiated', {
      bookingId: booking._id,
      amount: totalCost,
      currency: booking.currency,
      paymentMethod,
      transactionRef,
      paymentUrl: `/payment/checkout?ref=${transactionRef}&booking=${booking._id}`
    })
  );
});

export const confirmPayment = asyncHandler(async (req, res) => {
  const { bookingId, transactionRef } = req.body;

  if (!bookingId) {
    throw new ApiError(400, 'Booking ID is required');
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized');
  }

  if (booking.paymentStatus === 'paid') {
    throw new ApiError(400, 'Already paid');
  }

  const port = await ChargerPort.findById(booking.port);
  if (!port || port.availability !== 'available') {
    throw new ApiError(400, 'Charger port is no longer available');
  }

  booking.paymentStatus = 'paid';
  booking.transactionId = transactionRef || `TXN-${Date.now()}`;
  booking.status = 'confirmed';
  booking.checkInCode = generateCheckInCode();
  if (!booking.totalCost) {
    const portData = await ChargerPort.findById(booking.port);
    booking.totalCost = calculateBookingCost(portData, booking.startTime, booking.endTime);
  }
  await booking.save();

  port.availability = 'reserved';
  port.lastStatusUpdate = new Date();
  await port.save();

  const populated = await Booking.findById(booking._id)
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel powerKw pricing');

  res.status(200).json(
    new ApiResponse(200, 'Payment successful', populated)
  );
});

export const getPaymentStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId)
    .select('paymentStatus totalCost currency transactionId paymentMethod status checkInCode');

  if (!booking) throw new ApiError(404, 'Booking not found');

  if (
    booking.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw new ApiError(403, 'Not authorized');
  }

  res.status(200).json(
    new ApiResponse(200, 'Payment status fetched', booking)
  );
});

export const getOwnerTransactions = asyncHandler(async (req, res) => {
  const stations = await EvStation.find({ operator: req.user._id }).select('_id');
  const stationIds = stations.map((s) => s._id);

  const bookings = await Booking.find({
    station: { $in: stationIds },
    paymentStatus: 'paid'
  })
    .populate('user', 'name email')
    .populate('station', 'name')
    .sort({ updatedAt: -1 })
    .limit(50);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);

  res.status(200).json(
    new ApiResponse(200, 'Transactions fetched', { bookings, totalRevenue })
  );
});
