import api from './api.js';

export const fetchStationReviews = (stationId, params = {}) =>
  api.get(`/reviews/station/${stationId}`, { params }).then((r) => r.data.data);

export const createReview = (data) =>
  api.post('/reviews', data).then((r) => r.data.data);

export const deleteReview = (id) =>
  api.delete(`/reviews/${id}`).then((r) => r.data.data);

export const replyToReview = (id, text) =>
  api.post(`/reviews/${id}/reply`, { text }).then((r) => r.data.data);
