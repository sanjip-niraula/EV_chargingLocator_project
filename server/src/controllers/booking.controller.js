import Booking from '../models/Booking.js';
import { ChargerPort } from '../models/Charger.js';
import { EvStation } from '../models/Station.js';
import { User } from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── Create Booking ────────────────────────────────────────
export const createBooking = asyncHandler(async (req, res) => {
  const { userId, portId, stationId, startTime, endTime, vehicle, paymentMethod } = req.body;

  // Validate required fields
  if (!userId || !portId || !stationId || !startTime || !endTime) {
    throw new ApiError(400, 'Missing required fields');
  }

  // Validate dates
  if (new Date(endTime) <= new Date(startTime)) {
    throw new ApiError(400, 'End time must be after start time');
  }

  // Check if user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    throw new ApiError(404, 'User not found');
  }

  // Check if port exists and is available
  const port = await ChargerPort.findById(portId);
  if (!port) {
    throw new ApiError(404, 'Charger port not found');
  }

  if (port.availability !== 'available') {
    throw new ApiError(400, 'Port is not available');
  }

  // Check for conflicting bookings
  const conflictingBooking = await Booking.findOne({
    port: portId,
    status: { $in: ['confirmed', 'active'] },
    $or: [
      {
        startTime: { $lt: new Date(endTime) },
        endTime: { $gt: new Date(startTime) }
      }
    ]
  });

  if (conflictingBooking) {
    throw new ApiError(400, 'Port is already booked for this time period');
  }

  // Create booking
  const booking = await Booking.create({
    user: userId,
    station: stationId,
    port: portId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    vehicle: vehicle || {},
    paymentMethod: paymentMethod || 'card',
    status: 'pending'
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel');

  res.status(201).json(
    new ApiResponse(201, 'Booking created successfully', populatedBooking)
  );
});

// ─── Get All Bookings ────────────────────────────────────────
export const getAllBookings = asyncHandler(async (req, res) => {
  const { status, userId, stationId, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (userId) filter.user = userId;
  if (stationId) filter.station = stationId;

  const skip = (page - 1) * limit;

  const bookings = await Booking.find(filter)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Booking.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, 'Bookings fetched successfully', {
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Get Booking by ID ────────────────────────────────────────
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id)
    .populate('user', 'name email phone')
    .populate('station', 'name address photos')
    .populate('port', 'portNumber connectorType chargeLevel powerKw pricing');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'Booking fetched successfully', booking)
  );
});

// ─── Update Booking ────────────────────────────────────────
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, energyDeliveredKwh, totalCost, paymentStatus, paymentMethod, transactionId } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Update allowed fields
  if (status) booking.status = status;
  if (energyDeliveredKwh !== undefined) booking.energyDeliveredKwh = energyDeliveredKwh;
  if (totalCost !== undefined) booking.totalCost = totalCost;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  if (paymentMethod) booking.paymentMethod = paymentMethod;
  if (transactionId) booking.transactionId = transactionId;

  const updatedBooking = await booking.save();

  const populatedBooking = await Booking.findById(updatedBooking._id)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel');

  res.status(200).json(
    new ApiResponse(200, 'Booking updated successfully', populatedBooking)
  );
});

// ─── Cancel Booking ────────────────────────────────────────
export const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cancelReason } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  if (!['pending', 'confirmed'].includes(booking.status)) {
    throw new ApiError(400, 'Cannot cancel a booking with this status');
  }

  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  booking.cancelReason = cancelReason || 'User requested cancellation';

  const updatedBooking = await booking.save();

  res.status(200).json(
    new ApiResponse(200, 'Booking cancelled successfully', updatedBooking)
  );
});

// ─── Confirm Booking ────────────────────────────────────────
export const confirmBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  if (booking.status !== 'pending') {
    throw new ApiError(400, 'Only pending bookings can be confirmed');
  }

  booking.status = 'confirmed';
  const updatedBooking = await booking.save();

  const populatedBooking = await Booking.findById(updatedBooking._id)
    .populate('user', 'name email phone')
    .populate('station', 'name address')
    .populate('port', 'portNumber connectorType chargeLevel');

  res.status(200).json(
    new ApiResponse(200, 'Booking confirmed successfully', populatedBooking)
  );
});

// ─── Get User Bookings ────────────────────────────────────────
export const getUserBookings = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { user: userId };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const bookings = await Booking.find(filter)
    .populate('station', 'name address photos')
    .populate('port', 'portNumber connectorType chargeLevel')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Booking.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, 'User bookings fetched successfully', {
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Delete Booking ────────────────────────────────────────
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'Booking deleted successfully', null)
  );
});
