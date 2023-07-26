const router = require('express').Router();
const itemRouter = require('./itemRoutes');
const ItemController = require('../controller/itemController');
const itemController = ItemController();

router.use('/api/item', itemRouter);

module.exports = router;
