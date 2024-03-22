import { ItemsRepository } from '../repository/items.repository.js';
import { Messages } from '../error/messages.js';
import itemType from '../constants/itemType.js';
import { ValidationCheck } from '../utils/validationCheck.js';

export class ItemsService {
  _itemsRepository = new ItemsRepository();

  getItems = async type => {
    if (!ValidationCheck(itemType, type) && type !== 'all') {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }
    return {
      code: 200,
      data: await this._itemsRepository.getItems(type),
    };
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
    const result = await this._itemsRepository.createItem(item);
    return {
      code: 200,
      message: `${result.insertId}번으로 메뉴가 생성되었습니다.`,
    };
  };

  updateItem = async item => {
    if (!ValidationCheck(itemType, item.type)) {
      return {
        code: 400,
        message: Messages.WrongType,
      };
    }
    if (!item.price || item.price < 0) {
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
    const [result] = await this._itemsRepository.updateItem(item);
    console.log(result);
    if (result.affectedRows === 0) {
      return {
        code: 400,
        message: Messages.NoneExist,
      };
    }
    return {
      code: 200,
    };
  };

  deleteItem = async name => {
    if (typeof name !== 'string') {
      return {
        code: 400,
        message: Messages.WrongName,
      };
    }
    const result = await this._itemsRepository.deleteItem(name);
    if (result.affectedRows === 0) {
      return {
        code: 404,
        message: Messages.NoneExist,
      };
    }
    return {
      code: 200,
    };
  };
}
