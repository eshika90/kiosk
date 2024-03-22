import { ItemsRepository } from '../repository/items.repository.js';
import { Messages } from '../error/messages.js';
import { itemType } from '../constants/itemType.js';
import { ValidationCheck } from '../utils/validationCheck.js';

export class ItemsService {
  _itemsRepository = new ItemsRepository();

  getItems = () => {
    return this._itemsRepository.getItems();
  };

  getTypeItems = type => {
    if (!typesOfCafeItem[type]) {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }
    return this._itemsRepository.getTypeItems(type);
  };

  createItem = async item => {
    if (!item.name || typeof item.name !== 'string') {
      return {
        code: 400,
        message: Messages.WrongName,
      };
    }
    if (!item.price || typeof item.price < 0) {
      return {
        code: 400,
        message: Messages.WrongPrice,
      };
    }
    if (!item.type || !ValidationCheck(itemType, item.type)) {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }
    const existingItemName = await this._itemsRepository.getItemByName(
      item.name,
    );
    if (existingItemName.length !== 0) {
      return {
        code: 400,
        message: Messages.ExistName,
      };
    }
    return {
      code: 200,
      data: await this._itemsRepository.createItem(item),
    };
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
