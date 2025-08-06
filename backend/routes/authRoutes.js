import express from 'express';
import { register, login } from '../controllers/authController.js';
import validInfo from '../middleware/validInfo.js';

const router = express.Router();

router.post('/register', validInfo, register);
router.post('/login', validInfo, login);

export default router;