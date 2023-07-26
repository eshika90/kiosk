const ItemService = require('../service/itemService');

class ItemController {
  itemService = ItemService();
  addItem = (req, res, next) => {
    const { name, price, type, amount } = req.body;
  };
}

module.exports = ItemController;
