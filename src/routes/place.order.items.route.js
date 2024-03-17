import { Router } from 'express';
import { PlaceOrderItemsController } from '../controller/place.order.items.controller';

const router = Router();
const placeOrderItemsController = new PlaceOrderItemsController();

router.post('/', placeOrderItemsController.create);

export default router;
