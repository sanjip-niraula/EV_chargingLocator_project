import jwt from 'jsonwebtoken';
import { env } from '#config/env';

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
