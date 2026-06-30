import express from 'express';
import { getUsers, register, login } from '#controllers/account/user.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);

export default router;
