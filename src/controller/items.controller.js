import { ItemsService } from '../service/items.service.js';
import { Messages } from '../error/messages.js';

export class ItemsController {
  _itemsService = new ItemsService();

  // type에 속한 메뉴들을 조회(커피: 아메리카노, 라떼, ...etc)
  getItems = async (req, res) => {
    try {
      const { type } = req.params;
      const { code, data, message } = await this._itemsService.getItems(type);
      res
        .status(code)
        .json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      res.status(500).json({ errorMessage: Messages.ServerError });
    }
  };

  // 메뉴 작성(관리자만 가능하게 해야함)
  // 현재 누구나 작성가능
  createItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      const { code, data, message } = await this._itemsService.createItem({
        name,
        price,
        type,
      });
      res.status(code).json({
        ...(data && { data }),
        ...(message && { message }),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errorMessage: Messages.ServerError });
    }
  };

  // 아이템을 name으로 수정
  updateItem = async (req, res) => {
    try {
      const { name } = req.params;
      const { modifiedName, price, type } = req.body;
      const { code, data, message } = await this._itemsService.updateItem({
        name,
        modifiedName,
        price,
        type,
      });
      res.status(code).json({
        ...(data && { data }),
        ...(message && { message }),
      });
    } catch (e) {
      res.status(500).json({ errorMessage: Messages.ServerError });
    }
  };

  // 아이템을 name으로 삭제
  deleteItem = async (req, res) => {
    try {
      const { name } = req.params;
      const { code, data, message } = await this._itemsService.deleteItem(name);
      res.status(code).json({
        ...(data && { data }),
        ...(message && { message }),
      });
    } catch (e) {
      res.status(500).json({ errorMessage: Messages.ServerError });
    }
  };
}
