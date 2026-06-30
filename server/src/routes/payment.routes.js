import express from 'express';
import * as paymentController from '#controllers/payment.controller';
import { authenticate, authorize } from '#middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/initiate', authorize('user'), paymentController.initiatePayment);
router.post('/confirm', authorize('user'), paymentController.confirmPayment);
router.get('/booking/:bookingId', paymentController.getPaymentStatus);
router.get('/transactions', authorize('station_owner', 'admin'), paymentController.getOwnerTransactions);

export default router;
