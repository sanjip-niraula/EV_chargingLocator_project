import bcrypt from 'bcryptjs';
import { User } from '#models/User';
import ApiResponse from '#utils/ApiResponse';
import ApiError from '#utils/ApiError';
import asyncHandler from '#utils/asyncHandler';
import { generateToken } from '#utils/jwt';

const sanitizeUser = (user) => {
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, 'Users fetched successfully', users)
  );
});

export const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    vehicleType,
    businessName,
    location,
    role = 'user'
  } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  const allowedRoles = ['user', 'station_owner', 'admin'];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    role,
    vehicleType: role === 'user' ? vehicleType : undefined,
    businessName: role === 'station_owner' ? businessName : undefined,
    location: role === 'station_owner' ? location : undefined
  });

  res.status(201).json(
    new ApiResponse(201, 'Account created successfully', sanitizeUser(user))
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'User account is inactive');
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json(
    new ApiResponse(200, 'Login successful', {
      user: sanitizeUser(user),
      token
    })
  );
});
