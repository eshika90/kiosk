import { ItemsRepository } from '../repository/items.repository.js';

export class ItemsService {
  constructor() {
    const typesOfCafeItem = {
      1: 'COFFEE',
      2: 'SMOOTHIE',
      3: 'ADE',
      4: 'SWEETS',
    };
    Object.freeze(typesOfCafeItem);
  }
  _itemsRepository = new ItemsRepository();

  getItems = () => {
    return this._itemsRepository.getItems();
  };

  getItemById = id => {
    if (typeof id !== 'number') {
      const err = new Error('id는 숫자만 입력 가능합니다.');
      err.statusCode = 400;
      throw err;
    }
    return this._itemsRepository.getItemById(id);
  };

  getTypeItems = type => {
    if (!typesOfCafeItem[type]) {
      const err = new Error(
        '종류는 COFFEE, SMOOTHIE, ADE, SWEETS중 하나만 선택 가능합니다.',
      );
      err.statusCode = 400;
      throw err;
    }
    return this._itemsRepository.getTypeItems(type);
  };

  createItem = async (name, price, type) => {
    if (
      typeof name !== 'string' ||
      typeof price !== 'number' ||
      typeof type !== 'string'
    ) {
      throw new Error('name, type은 문자, price는 숫자여야 합니다. ');
    }
    if (
      type !== 'COFFEE' &&
      type !== 'SMOOTHIE' &&
      type !== 'ADE' &&
      type !== 'SWEETS'
    ) {
      throw new Error(
        'type은 COFFEE, SMOOTHIE, ADE, SWEETS 중 하나만 선택 가능합니다.',
      );
    }
    const existingItemName = await this._itemsRepository.getItemByName(name);
    if (existingItemName.length !== 0) {
      throw new Error('이미 존재하는 메뉴입니다.');
    }
    return await this._itemsRepository.createItem(name, price, type);
  };

  updateItem = async (name, price, type) => {
    if (
      typeof name !== 'string' ||
      typeof price !== 'number' ||
      typeof type !== 'string'
    ) {
      throw new Error('name, type은 문자, price는 숫자여야 합니다. ');
    }
    if (
      type !== 'COFFEE' &&
      type !== 'SMOOTHIE' &&
      type !== 'ADE' &&
      type !== 'SWEETS'
    ) {
      throw new Error(
        'type은 COFFEE, SMOOTHIE, ADE, SWEETS 중 하나만 선택 가능합니다.',
      );
    }
    return await this._itemsRepository.updateItem(name, price, type);
  };

  deleteItem = async name => {
    if (typeof name !== 'string') throw new Error('name은 문자여야 합니다.');
    return await this._itemsRepository.deleteItem(name);
  };
}
