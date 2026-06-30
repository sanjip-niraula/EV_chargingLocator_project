import api from './api.js';

export const initiatePayment = (bookingId, paymentMethod) =>
  api.post('/payments/initiate', { bookingId, paymentMethod }).then((r) => r.data.data);

export const confirmPayment = (bookingId, transactionRef) =>
  api.post('/payments/confirm', { bookingId, transactionRef }).then((r) => r.data.data);

export const getPaymentStatus = (bookingId) =>
  api.get(`/payments/booking/${bookingId}`).then((r) => r.data.data);
