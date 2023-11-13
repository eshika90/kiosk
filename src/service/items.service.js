import { ItemsRepository } from '../repository/items.repository.js';

export class ItemsService {
  _itemsRepository = new ItemsRepository();

  getItems = () => {
    return this._itemsRepository.getItems();
  };
}
