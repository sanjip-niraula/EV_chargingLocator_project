import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'station_owner', 'admin'],
      default: 'user'
    },
    vehicleType: {
      type: String
    },
    businessName: {
      type: String
    },
    location: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
