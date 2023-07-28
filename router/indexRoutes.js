import express from 'express';
const router = express.Router();
import itemRouter from './itemRoutes.js';

router.use('/', itemRouter);

export default router;
