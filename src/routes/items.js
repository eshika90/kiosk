import { Router } from 'express';
import { ItemsController } from '../controller/items.controller.js';

const router = Router();
const itemsController = new ItemsController();

router.get('/', itemsController.getItems);
router.get('/:id', itemsController.getItemById);
router.get('/types', itemsController.getTypeItems);
router.post('/', itemsController.createItem);
router.put('/', itemsController.updateItem);
router.delete('/', itemsController.deleteItem);

export default router;
