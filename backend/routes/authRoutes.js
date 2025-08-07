import express from 'express';
import { register, login, verify, getDashboard } from '../controllers/userController.js';
import validInfo from '../middleware/validInfo.js';
import authorization from '../middleware/authorization.js';
const router = express.Router();

router.post('/register', validInfo, register);
router.post('/login', validInfo, login);
router.post('/verify', authorization, verify);
router.get('/dashboard', authorization, getDashboard);


export default router;