import express from 'express';
import * as chargerController from '#controllers/charger.controller';
import { authenticate, authorize } from '#middleware/authMiddleware';

const router = express.Router();

router.get('/', chargerController.getAllChargerPorts);
router.get('/station/:stationId', chargerController.getPortsByStation);
router.get('/station/:stationId/stats', chargerController.getPortStatisticsByStation);
router.get('/:id', chargerController.getChargerPortById);

router.post('/', authenticate, authorize('station_owner', 'admin'), chargerController.createChargerPort);
router.put('/:id', authenticate, authorize('station_owner', 'admin'), chargerController.updateChargerPort);
router.patch('/:id/status', authenticate, authorize('station_owner', 'admin'), chargerController.updatePortStatus);
router.put('/:id/pricing', authenticate, authorize('station_owner', 'admin'), chargerController.updatePricing);
router.delete('/:id', authenticate, authorize('station_owner', 'admin'), chargerController.deleteChargerPort);

export default router;
