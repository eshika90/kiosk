import express from 'express';
const router = express.Router();
import ItemController from '../controller/itemController.js';
const itemController = new ItemController();

router.post('/item', itemController.addItem);
router.get('/item', itemController.getItem);
router.get('/item/type', itemController.getTypeItem);
router.put('/item/:id', itemController.modifyItem);
router.delete('/item/:id', itemController.deleteItem);

export default router;
