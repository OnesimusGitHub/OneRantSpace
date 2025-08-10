import express from 'express';
import { getAllRants, createRant, deleteRant, updateRant, getRantById } from '../controllers/rantController.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();


router.get('/', getAllRants);
router.get('/:rant_id', getRantById);


router.post('/', authorization, createRant);
router.delete('/:rant_id', authorization, deleteRant);
router.put('/:rant_id', authorization, updateRant);

export default router;