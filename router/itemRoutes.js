import express from 'express';
const router = express.Router();
import ItemController from '../controller/itemController.js';
const itemController = new ItemController();

router.post('/item', itemController.addItem);
// router.get('/', itemController.getItem);
// router.delete('/', itemController.removeItem);

export default router;
