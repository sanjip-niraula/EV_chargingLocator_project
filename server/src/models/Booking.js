import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
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
    port: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChargerPort',
      required: true
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no_show'],
      default: 'pending'
    },
    energyDeliveredKwh: { type: Number },
    totalCost: { type: Number },
    currency: { type: String, default: 'NPR' },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded', 'failed'],
      default: 'unpaid'
    },
    paymentMethod: { type: String },
    transactionId: { type: String },
    vehicle: {
      make: String,
      model: String,
      connectorType: String
    },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    checkInCode: { type: String }
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ port: 1, startTime: 1, endTime: 1 });
bookingSchema.index({ station: 1, startTime: -1 });
bookingSchema.index({ status: 1, startTime: 1 });

export default mongoose.model('Booking', bookingSchema);
