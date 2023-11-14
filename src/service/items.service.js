import { ItemsRepository } from '../repository/items.repository.js';

export class ItemsService {
  _itemsRepository = new ItemsRepository();

  getItems = () => {
    return this._itemsRepository.getItems();
  };

  getItemById = id => {};

  createItem = async (name, price, type) => {
    if (!name || !price || !type) {
      const err = new Error('name, price, type은 필수 항목입니다.');
      err.statusCode = 400;
    }
    if (
      typeof name === string ||
      typeof price === number ||
      typeof type === string
    ) {
      const err = new Error('name, type은 문자, price는 숫자여야 합니다. ');
      err.statusCode = 400;
    }
    if (type == 'coffee' || type == 'smoothie' || type == 'juice') {
      const err = new Error(
        'type은 coffee, smoothie, juice중 하나만 선택 가능합니다.',
      );
      err.statusCode = 400;
    }
    await this._itemsRepository.createItem(name, price, type);
  };
}
