import crypto from 'crypto';
import Booking from '../models/Booking.js';
import { ChargerPort } from '../models/Charger.js';
import { EvStation } from '../models/Station.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const calculateCost = (port, startTime, endTime) => {
  if (port.pricing?.freeCharging) return 0;
  const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
  const sessionFee = port.pricing?.sessionFee || 0;
  const perKwh = port.pricing?.perKwh || 0;
  if (perKwh > 0) {
    return Math.round(sessionFee + (port.powerKw || 50) * hours * 0.8 * perKwh);
  }
  return Math.round(sessionFee + hours * 60 * (port.pricing?.perMinute || 0));
};

export const createBooking = asyncHandler(async (req, res) => {
  const { portId, stationId, startTime, endTime, vehicle } = req.body;
  const userId = req.user._id;

  if (!portId || !stationId || !startTime || !endTime) {
    throw new ApiError(400, 'Missing required fields');
  }

  if (new Date(endTime) <= new Date(startTime)) {
    throw new ApiError(400, 'End time must be after start time');
  }

  const port = await ChargerPort.findById(portId);
  if (!port) throw new ApiError(404, 'Charger port not found');
  if (port.availability !== 'available') {
    throw new ApiError(400, 'Port is not available');
  }

  const conflictingBooking = await Booking.findOne({
    port: portId,
    status: { $in: ['pending', 'confirmed', 'active'] },
    startTime: { $lt: new Date(endTime) },
    endTime: { $gt: new Date(startTime) }
  });

  if (conflictingBooking) {
    throw new ApiError(400, 'Port is already booked for this time period');
  }

  const totalCost = calculateCost(port, startTime, endTime);

  const booking = await Booking.create({
    user: userId,
    station: stationId,
    port: portId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    vehicle: vehicle || {},
    totalCost,
    currency: port.pricing?.currency || 'NPR',
    status: 'pending'
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel powerKw pricing');

  res.status(201).json(
    new ApiResponse(201, 'Booking created successfully', populatedBooking)
  );
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;

  const bookings = await Booking.find(filter)
    .populate('station', 'name address photos')
    .populate('port', 'portNumber connectorType chargeLevel powerKw pricing')
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, 'Your bookings fetched', bookings)
  );
});

export const getStationBookings = asyncHandler(async (req, res) => {
  const { stationId } = req.params;
  const station = await EvStation.findById(stationId);
  if (!station) throw new ApiError(404, 'Station not found');

  if (
    station.operator.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw new ApiError(403, 'Not authorized');
  }

  const bookings = await Booking.find({ station: stationId })
    .populate('user', 'name email phone')
    .populate('port', 'portNumber connectorType')
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, 'Station bookings fetched', bookings)
  );
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('station', 'name address photos')
    .populate('port', 'portNumber connectorType chargeLevel powerKw pricing');

  if (!booking) throw new ApiError(404, 'Booking not found');

  const isOwner = booking.user._id.toString() === req.user._id.toString();
  const station = await EvStation.findById(booking.station);
  const isOperator = station?.operator?.toString() === req.user._id.toString();

  if (!isOwner && !isOperator && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized');
  }

  res.status(200).json(
    new ApiResponse(200, 'Booking fetched successfully', booking)
  );
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  const isOwner = booking.user.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized');
  }

  if (!['pending', 'confirmed'].includes(booking.status)) {
    throw new ApiError(400, 'Cannot cancel booking in current status');
  }

  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  booking.cancelReason = req.body.cancelReason || 'Cancelled by user';
  await booking.save();

  const port = await ChargerPort.findById(booking.port);
  if (port && port.availability === 'reserved') {
    port.availability = 'available';
    port.lastStatusUpdate = new Date();
    await port.save();
  }

  res.status(200).json(
    new ApiResponse(200, 'Booking cancelled', booking)
  );
});

export const confirmBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (booking.status !== 'pending' && booking.status !== 'confirmed') {
    throw new ApiError(400, 'Cannot confirm this booking');
  }

  if (booking.paymentStatus !== 'paid') {
    throw new ApiError(400, 'Payment required before confirmation');
  }

  booking.status = 'confirmed';
  if (!booking.checkInCode) {
    booking.checkInCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  }
  await booking.save();

  const populated = await Booking.findById(booking._id)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType');

  res.status(200).json(
    new ApiResponse(200, 'Booking confirmed', populated)
  );
});

export const startCharging = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.status !== 'confirmed') {
    throw new ApiError(400, 'Booking must be confirmed to start charging');
  }

  booking.status = 'active';
  await booking.save();

  const port = await ChargerPort.findById(booking.port);
  if (port) {
    port.availability = 'occupied';
    port.lastStatusUpdate = new Date();
    await port.save();
  }

  res.status(200).json(new ApiResponse(200, 'Charging started', booking));
});

export const completeCharging = asyncHandler(async (req, res) => {
  const { energyDeliveredKwh } = req.body;
  const booking = await Booking.findById(req.params.id).populate('port');
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.status !== 'active') {
    throw new ApiError(400, 'Booking is not active');
  }

  booking.status = 'completed';
  if (energyDeliveredKwh) {
    booking.energyDeliveredKwh = energyDeliveredKwh;
    const perKwh = booking.port?.pricing?.perKwh || 0;
    booking.totalCost = Math.round(
      (booking.port?.pricing?.sessionFee || 0) + energyDeliveredKwh * perKwh
    );
  }
  await booking.save();

  const port = await ChargerPort.findById(booking.port);
  if (port) {
    port.availability = 'available';
    port.lastStatusUpdate = new Date();
    await port.save();
  }

  res.status(200).json(new ApiResponse(200, 'Charging completed', booking));
});
