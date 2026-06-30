import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// ─── User Auth & Account ───────────────────────────────────
router.post('/login', userController.loginUser);
router.post('/reset-password', userController.resetPassword);

// ─── User Utilities ────────────────────────────────────────
router.get('/stats/summary', userController.getUserStatistics);
router.get('/search/query', userController.searchUsers);

// ─── User CRUD ─────────────────────────────────────────────
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

//  Dynamic routes 
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.put('/:id/change-password', userController.changePassword);
router.put('/:id/deactivate', userController.deactivateUser);
router.put('/:id/reactivate', userController.reactivateUser);

export default router;