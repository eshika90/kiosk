import express from 'express';
const router = express.Router();
import PlaceOrderController from '../controller/placeOrderController.js';
const placeOrderController = new PlaceOrderController();

router.post('/placeorder', placeOrderController.order);
router.patch('/placeorder/:id', placeOrderController.updateState);

export default router;
