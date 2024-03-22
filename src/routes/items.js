import { Router } from 'express';
import { ItemsController } from '../controller/items.controller.js';

const router = Router();
const itemsController = new ItemsController();

router.get('/types/:type', itemsController.getItems);
router.post('/', itemsController.createItem);
router.put('/:name', itemsController.updateItem);
router.delete('/:name', itemsController.deleteItem);

export default router;
