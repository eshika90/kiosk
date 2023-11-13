import { ItemsService } from '../service/items.service.js';

export class ItemsController {
  _itemsService = new ItemsService();

  getItems = (req, res) => {
    const allItems = this._itemsService.getItems();
    res.status(200).json({ data: allItems });
  };
}
