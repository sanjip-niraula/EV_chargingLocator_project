import mongoose from 'mongoose';
import Review from '../models/Review.js';
import { EvStation } from '../models/Station.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── Create Review ────────────────────────────────────────
export const createReview = asyncHandler(async (req, res) => {
  const { stationId, rating, comment } = req.body;
  const userId = req.user._id;

  if (!stationId || !rating) {
    throw new ApiError(400, 'Station ID and rating are required');
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  const station = await EvStation.findById(stationId);
  if (!station) {
    throw new ApiError(404, 'Station not found');
  }

  // One review per user per station
  const existingReview = await Review.findOne({ user: userId, station: stationId });
  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this station');
  }

  const review = await Review.create({
    user: userId,
    station: stationId,
    rating,
    comment: comment || '',
    photos: []
  });

  // Update station average rating
  const allReviews = await Review.find({ station: stationId });
  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  await EvStation.findByIdAndUpdate(stationId, {
    avgRating: Math.round(avgRating * 10) / 10,
    reviewCount: allReviews.length
  });

  const populatedReview = await Review.findById(review._id)
    .populate('user', 'name')
    .populate('station', 'name');

  res.status(201).json(
    new ApiResponse(201, 'Review created successfully', populatedReview)
  );
});

// ─── Get Reviews by Station ────────────────────────────────────────
export const getStationReviews = asyncHandler(async (req, res) => {
  const { stationId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ station: stationId })
    .populate('user', 'name')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments({ station: stationId });

  res.status(200).json(
    new ApiResponse(200, 'Station reviews fetched successfully', {
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Get All Reviews (admin) ────────────────────────────────────────
export const getAllReviews = asyncHandler(async (req, res) => {
  const { stationId, minRating, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (stationId) filter.station = stationId;
  if (minRating) filter.rating = { $gte: parseInt(minRating) };

  const skip = (page - 1) * limit;

  const reviews = await Review.find(filter)
    .populate('user', 'name')
    .populate('station', 'name')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, 'Reviews fetched successfully', {
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Reply to Review (station owner) ────────────────────────────────────────
export const replyToReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new ApiError(400, 'Reply text is required');
  }

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  review.reply = {
    text,
    repliedAt: new Date()
  };

  const updatedReview = await review.save();
  const populatedReview = await Review.findById(updatedReview._id)
    .populate('user', 'name')
    .populate('station', 'name');

  res.status(200).json(
    new ApiResponse(200, 'Reply added successfully', populatedReview)
  );
});

// ─── Delete Review ────────────────────────────────────────
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  // Recalculate station rating
  const allReviews = await Review.find({ station: review.station });
  if (allReviews.length > 0) {
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await EvStation.findByIdAndUpdate(review.station, {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length
    });
  } else {
    await EvStation.findByIdAndUpdate(review.station, { avgRating: 0, reviewCount: 0 });
  }

  res.status(200).json(
    new ApiResponse(200, 'Review deleted successfully', null)
  );
});
