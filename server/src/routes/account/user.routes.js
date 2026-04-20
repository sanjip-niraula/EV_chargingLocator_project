import express from 'express';
import { getUsers } from '../../controllers/account/user.controller.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;
