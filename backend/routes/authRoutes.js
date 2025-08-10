import express from 'express';
import { login, verify, getDashboard } from '../controllers/userController.js';
import validInfo from '../middleware/validInfo.js';
import authorization from '../middleware/authorization.js';
const router = express.Router();

router.post('/login', validInfo, login);
router.post('/verify', authorization, verify);
router.get('/dashboard', authorization, getDashboard);


export default router;