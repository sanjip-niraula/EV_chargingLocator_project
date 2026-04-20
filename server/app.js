import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { userRoutes } from "#routes/index";
import errorMiddleware from "#middleware/errorMiddleware";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/account', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EV Charging Locator Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    statusCode: 404
  });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;