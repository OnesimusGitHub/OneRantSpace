import express from 'express';
import { getAllRants, createRant, deleteRant, updateRant } from '../controllers/rantController.js';

const router = express.Router();


router.get('/', getAllRants)

router.post('/', createRant)

router.delete('/', deleteRant)

router.put('/', updateRant)



export default router;