import { ItemsService } from '../service/items.service.js';

export class ItemsController {
  _itemsService = new ItemsService();

  getItems = (req, res) => {
    const allItems = this._itemsService.getItems();
    res.status(200).json({ data: allItems });
  };

  getItemById = (req, res) => {
    const { id } = req.body;
    const item = this._itemsService.getItemById(id);
    res.status(200).json({ data: item });
  };

  getTypeItems = (req, res) => {
    const { type } = req.body;
    const findByTypeItems = this._itemsService.getTypeItems(type);
    res.stauts(200).json({ data: findByTypeItems });
  };

  createItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      if (!name || !price || !type) {
        res
          .status(400)
          .json({ message: 'name, price, type은 필수 사항입니다.' });
      }
      const createdItem = await this._itemsService.createItem(
        name,
        price,
        type,
      );
      res.status(201).json({ data: createdItem });
    } catch (e) {
      res.status(500).json({ message: 'Server Error', error: e.message });
      console.error(e);
    }
  };
}
