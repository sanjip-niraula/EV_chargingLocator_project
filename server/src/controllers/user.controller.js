import { User } from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';

// ─── Create User ────────────────────────────────────────
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone
  });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json(
    new ApiResponse(201, 'User created successfully', userResponse)
  );
});

// ─── Get All Users ────────────────────────────────────────
export const getAllUsers = asyncHandler(async (req, res) => {
  const { isActive, page = 1, limit = 10, search } = req.query;

  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(filter)
    .select('-password')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, 'Users fetched successfully', {
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// ─── Get User by ID ────────────────────────────────────────
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'User fetched successfully', user)
  );
});

// ─── Update User ────────────────────────────────────────
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, isActive } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Update allowed fields
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (isActive !== undefined) user.isActive = isActive;

  const updatedUser = await user.save();
  const userResponse = updatedUser.toObject();
  delete userResponse.password;

  res.status(200).json(
    new ApiResponse(200, 'User updated successfully', userResponse)
  );
});

// ─── Change Password ────────────────────────────────────────
export const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Validate required fields
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, 'All password fields are required');
  }

  // Validate password match
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, 'New password and confirmation do not match');
  }

  // Validate password length
  if (newPassword.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Verify old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Old password is incorrect');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();

  res.status(200).json(
    new ApiResponse(200, 'Password changed successfully', null)
  );
});

// ─── Reset Password ────────────────────────────────────────
export const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // In a real application, you would generate a reset token and send an email
  // For now, just acknowledge the request
  res.status(200).json(
    new ApiResponse(200, 'Password reset link sent to email', null)
  );
});

// ─── Login User ────────────────────────────────────────
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError(403, 'User account is inactive');
  }

  const userResponse = user.toObject();
  delete userResponse.password;

  // In a real application, you would generate a JWT token here
  res.status(200).json(
    new ApiResponse(200, 'Login successful', {
      user: userResponse,
      token: 'JWT_TOKEN_HERE' // Replace with actual JWT generation
    })
  );
});

// ─── Deactivate User ────────────────────────────────────────
export const deactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isActive = false;
  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json(
    new ApiResponse(200, 'User deactivated successfully', userResponse)
  );
});

// ─── Reactivate User ────────────────────────────────────────
export const reactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isActive = true;
  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json(
    new ApiResponse(200, 'User reactivated successfully', userResponse)
  );
});

// ─── Delete User ────────────────────────────────────────
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(
    new ApiResponse(200, 'User deleted successfully', null)
  );
});

// ─── Get User Statistics ────────────────────────────────────────
export const getUserStatistics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const inactiveUsers = await User.countDocuments({ isActive: false });

  const stats = {
    total: totalUsers,
    active: activeUsers,
    inactive: inactiveUsers
  };

  res.status(200).json(
    new ApiResponse(200, 'User statistics fetched successfully', stats)
  );
});

// ─── Search Users ────────────────────────────────────────
export const searchUsers = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    throw new ApiError(400, 'Search query is required');
  }

  const skip = (page - 1) * limit;

  const users = await User.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  })
    .select('-password')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ name: 1 });

  const total = await User.countDocuments({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  });

  res.status(200).json(
    new ApiResponse(200, 'Users fetched successfully', {
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  );
});
