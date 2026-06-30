import express from 'express';
import * as bookingController from '#controllers/booking.controller';
import { authenticate, authorize } from '#middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize('user'), bookingController.createBooking);
router.get('/my', bookingController.getMyBookings);
router.get('/station/:stationId', authorize('station_owner', 'admin'), bookingController.getStationBookings);
router.get('/:id', bookingController.getBookingById);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.patch('/:id/confirm', authorize('station_owner', 'admin'), bookingController.confirmBooking);
router.patch('/:id/start', authorize('station_owner', 'admin'), bookingController.startCharging);
router.patch('/:id/complete', authorize('station_owner', 'admin'), bookingController.completeCharging);

export default router;
