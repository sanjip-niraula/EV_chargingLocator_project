import api from './api.js';

export const createBooking = (data) =>
  api.post('/bookings', data).then((r) => r.data.data);

export const fetchMyBookings = (status) =>
  api.get('/bookings/my', { params: status ? { status } : {} }).then((r) => r.data.data);

export const fetchStationBookings = (stationId) =>
  api.get(`/bookings/station/${stationId}`).then((r) => r.data.data);

export const cancelBooking = (id, cancelReason) =>
  api.patch(`/bookings/${id}/cancel`, { cancelReason }).then((r) => r.data.data);

export const confirmBooking = (id) =>
  api.patch(`/bookings/${id}/confirm`).then((r) => r.data.data);

export const startCharging = (id) =>
  api.patch(`/bookings/${id}/start`).then((r) => r.data.data);

export const completeCharging = (id, energyDeliveredKwh) =>
  api.patch(`/bookings/${id}/complete`, { energyDeliveredKwh }).then((r) => r.data.data);
