import express from 'express';
import { getAllRants, createRant, deleteRant, updateRant, getRantById } from '../controllers/rantController.js';

const router = express.Router();


router.get('/', getAllRants)

router.post('/', createRant)

router.delete('/:rant_id', deleteRant)

router.put('/:rant_id', updateRant)

router.get('/:rant_id', getRantById);


export default router;