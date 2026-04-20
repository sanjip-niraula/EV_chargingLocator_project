import express from "express";
import { userRoutes } from "#routes/index.js";
import errorMiddleware from "#middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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