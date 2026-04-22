import Review from '../models/Review.js';
import { EvStation } from '../models/Station.js';
import { User } from '../models/User.js';
import Booking from '../models/Booking.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── Create Review ────────────────────────────────────────
export const createReview = asyncHandler(async (req, res) => {
  const {
    userId,
    stationId,
    bookingId,
    rating,
    comment,
    photos,
    ratings: subRatings
  } = req.body;

  // Validate required fields
  if (!userId || !stationId || !rating) {
    throw new ApiError(400, 'Missing required fields');
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check if station exists
  const station = await EvStation.findById(stationId);
  if (!station) {
    throw new ApiError(404, 'Station not found');
  }

  // Check if booking exists (if provided)
  if (bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
  }

  // Check if user has already reviewed this station (one review per user per station)
  const existingReview = await Review.findOne({ user: userId, station: stationId });
  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this station');
  }

  const review = await Review.create({
    user: userId,
    station: stationId,
    booking: bookingId || null,
    rating,
    comment,
    photos: photos || [],
    ratings: subRatings || {}
  });

  const populatedReview = await Review.findById(review._id)
    .populate('user', 'name')
    .populate('station', 'name')
    .populate('booking', 'startTime endTime');

  res.status(201).json(
    new ApiResponse(201, 'Review created successfully', populatedReview)
  );
});

// ─── Get All Reviews ────────────────────────────────────────
export const getAllReviews = asyncHandler(async (req, res) => {
  const { stationId, userId, isVerified, minRating, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (stationId) filter.station = stationId;
  if (userId) filter.user = userId;
  if (isVerified === 'true') filter.isVerified = true;
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

// ─── Get Review by ID ────────────────────────────────────────
export const getReviewById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id)
    .populate('user', 'name email')
    .populate('station', 'name address avgRating reviewCount')
    .populate('booking', 'startTime endTime energyDeliveredKwh totalCost');

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'Review fetched successfully', review)
  );
});

// ─── Get Reviews by Station ────────────────────────────────────────
export const getStationReviews = asyncHandler(async (req, res) => {
  const { stationId } = req.params;
  const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ station: stationId })
    .populate('user', 'name')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ [sortBy]: -1 });

  const total = await Review.countDocuments({ station: stationId });

  // Calculate rating distribution
  const ratingDistribution = await Review.aggregate([
    { $match: { station: mongoose.Types.ObjectId(stationId) } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } }
  ]);

  res.status(200).json(
    new ApiResponse(200, 'Station reviews fetched successfully', {
      reviews,
      ratingDistribution,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Get Reviews by User ────────────────────────────────────────
export const getUserReviews = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ user: userId })
    .populate('station', 'name')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments({ user: userId });

  res.status(200).json(
    new ApiResponse(200, 'User reviews fetched successfully', {
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

// ─── Update Review ────────────────────────────────────────
export const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment, photos, ratings: subRatings } = req.body;

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  // Update allowed fields
  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      throw new ApiError(400, 'Rating must be between 1 and 5');
    }
    review.rating = rating;
  }

  if (comment !== undefined) review.comment = comment;
  if (photos) review.photos = photos;
  if (subRatings) review.ratings = subRatings;

  const updatedReview = await review.save();
  const populatedReview = await Review.findById(updatedReview._id)
    .populate('user', 'name')
    .populate('station', 'name');

  res.status(200).json(
    new ApiResponse(200, 'Review updated successfully', populatedReview)
  );
});

// ─── Reply to Review ────────────────────────────────────────
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

// ─── Like Review ────────────────────────────────────────
export const likeReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  review.likes += 1;
  const updatedReview = await review.save();

  res.status(200).json(
    new ApiResponse(200, 'Review liked successfully', updatedReview)
  );
});

// ─── Verify Review ────────────────────────────────────────
export const verifyReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndUpdate(
    id,
    { isVerified: true },
    { new: true }
  )
    .populate('user', 'name')
    .populate('station', 'name');

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'Review verified successfully', review)
  );
});

// ─── Delete Review ────────────────────────────────────────
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'Review deleted successfully', null)
  );
});

// ─── Get Review Statistics ────────────────────────────────────────
export const getReviewStatistics = asyncHandler(async (req, res) => {
  const { stationId } = req.params;

  const stats = await Review.aggregate([
    { $match: { station: mongoose.Types.ObjectId(stationId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        verifiedReviews: {
          $sum: { $cond: ['$isVerified', 1, 0] }
        },
        averageSpeed: { $avg: '$ratings.speed' },
        averageReliability: { $avg: '$ratings.reliability' },
        averageAmenities: { $avg: '$ratings.amenities' },
        averageValue: { $avg: '$ratings.value' }
      }
    }
  ]);

  if (stats.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, 'No reviews found', null)
    );
  }

  res.status(200).json(
    new ApiResponse(200, 'Review statistics fetched successfully', stats[0])
  );
});
