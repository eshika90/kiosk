import { Router } from 'express';
import { ItemsController } from '../controller/items.controller.js';

const router = Router();
const itemsController = new ItemsController();

router.get('/', itemsController.getItems);

export default router;
