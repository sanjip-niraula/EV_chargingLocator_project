  import mongoose from 'mongoose';

// ─── Review Schema ────────────────────────────────────────────────
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EvStation',
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    photos: [
      {
        type: String
      }
    ],

    // Sub ratings
    ratings: {
      speed: { type: Number, min: 1, max: 5 },
      reliability: { type: Number, min: 1, max: 5 },
      amenities: { type: Number, min: 1, max: 5 },
      value: { type: Number, min: 1, max: 5 }
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    likes: {
      type: Number,
      default: 0
    },

    reply: {
      text: { type: String },
      repliedAt: { type: Date }
    }
  },
  { timestamps: true }
);

// ─── Indexes ────────────────────────────────────────────────
reviewSchema.index({ station: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ user: 1, station: 1 }, { unique: true });

// ─── Update Station Rating Automatically ─────────────────────
reviewSchema.post('save', async function () {
  try {
    const EvStation = mongoose.model('EvStation');
    const Review = mongoose.model('Review');

    const result = await Review.aggregate([
      { $match: { station: this.station } },
      {
        $group: {
          _id: '$station',
          avg: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    if (result.length > 0) {
      await EvStation.findByIdAndUpdate(this.station, {
        avgRating: Math.round(result[0].avg * 10) / 10,
        reviewCount: result[0].count
      });
    }
  } catch (err) {
    console.log('Error updating station rating:', err.message);
  }
});

// ─── Model ────────────────────────────────────────────────
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;