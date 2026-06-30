import express from 'express';
import * as stationController from '#controllers/station.controller';
import { authenticate, authorize } from '#middleware/authMiddleware';

const router = express.Router();

router.get('/nearby', stationController.getNearbyStations);
router.get('/operator/me', authenticate, authorize('station_owner', 'admin'), stationController.getMyStations);
router.get('/', stationController.getAllStations);
router.get('/:id/live', stationController.getStationLiveStatus);
router.get('/:id', stationController.getStationById);

router.post('/', authenticate, authorize('station_owner', 'admin'), stationController.createStation);
router.put('/:id', authenticate, authorize('station_owner', 'admin'), stationController.updateStation);
router.delete('/:id', authenticate, authorize('station_owner', 'admin'), stationController.deleteStation);

export default router;
