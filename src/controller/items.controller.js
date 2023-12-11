import { ItemsService } from '../service/items.service.js';

export class ItemsController {
  _itemsService = new ItemsService();

  // 카페의 모든 메뉴를 조회
  getItems = (req, res) => {
    const allItems = this._itemsService.getItems();
    res.status(200).json({ data: allItems });
  };

  // 특정 메뉴를 id(number)로 조회
  getItemById = (req, res) => {
    const { id } = req.body;
    try {
      if (!id) throw new Error('id는 필수로 입력해야 합니다.');
      const item = this._itemsService.getItemById(id);
      res.status(200).json({ data: item });
    } catch (e) {
      res.status(400).json({ errorMessage: e.message });
    }   
  };

  // type에 속한 메뉴들을 조회(커피: 아메리카노, 라떼, ...etc)
  getTypeItems = (req, res) => {
    const { type } = req.body;
    const findByTypeItems = this._itemsService.getTypeItems(type);
    res.stauts(200).json({ data: findByTypeItems });
  };

  // 메뉴 작성(관리자만 가능하게 해야함)
  // 현재 누구나 작성가능
  createItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      if (!name || !price || !type)
        throw new Error('name, price, type은 필수로 입력해야 합니다.');
      const createdItem = await this._itemsService.createItem(
        name,
        price,
        type,
      );
      res.status(201).json({
        Message: `${createdItem.insertId}번으로 메뉴가 생성되었습니다.`,
      });
    } catch (e) {
      res.status(400).json({ errorMessage: e.message });
    }
  };

  // 아이템을 name으로 수정
  updateItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      if (!name || !price || !type)
        throw new Error('name, price, type은 필수로 입력해야 합니다.');
      await this._itemsService.updateItem(name, price, type);
      res.status(201).json({ message: '수정이 완료되었습니다.' });
    } catch (e) {
      res.status(400).json({ errorMessage: e.message });
    }
  };

  // 아이템을 name으로 삭제
  deleteItem = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) throw new Error('name은 필수로 입력해야 합니다.');
      await this._itemsService.deleteItem(name);
      res.status(201).json({ message: '삭제가 완료되었습니다.' });
    } catch (e) {
      res.status(400).json({ errorMessage: e.message });
    }
  };
}
