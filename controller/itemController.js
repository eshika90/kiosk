import ItemService from '../service/itemService.js';

class ItemController {
  constructor(dbConnection) {
    this.itemService = new ItemService(dbConnection);
  }

  addItem = async (req, res, next) => {
    const { name, price, type, amount } = req.body;

    if (!name || !price || !type) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    if (
      type !== 'COFFEE' &&
      type !== 'JUICE' &&
      type !== 'TEA' &&
      type !== 'SMOOTHIE'
    ) {
      return res.status(400).json({
        message:
          '메뉴의 타입은 COFFEE, TEA, JUICE, SMOOTHIE 중 하나여야 합니다.',
      });
    }

    try {
      const result = await this.itemService.addItem(name, price, type, amount);
      return res
        .status(200)
        .json({ message: `${result}로 메뉴가 생성되었습니다.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '메뉴 생성에 실패하였습니다.' });
    }
  };
  getItem = async (req, res, next) => {
    try {
      const allItems = await this.itemService.getItem();
      res.status(200).json({ data: allItems });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '메뉴 조회에 실패하였습니다.' });
    }
  };
  getTypeItem = async (req, res, next) => {
    try {
      const { type } = req.query;
      if (
        type !== 'COFFEE' &&
        type !== 'JUICE' &&
        type !== 'TEA' &&
        type !== 'SMOOTHIE'
      ) {
        return res.status(400).json({
          message:
            '메뉴의 타입은 COFFEE, TEA, JUICE, SMOOTHIE 중 하나여야 합니다.',
        });
      }
      const typeAllItems = await this.itemService.getTypeItem(type);
      res.status(200).json({ data: typeAllItems });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: '메뉴 타입별 조회에 실패하였습니다.' });
    }
  };
  modifyItem = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, type, amount } = req.body;
    try {
      const updateItem = await this.itemService.modifyItem(
        name,
        price,
        type,
        amount,
        id
      );
      return res.status(200).json({ data: updateItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '메뉴 수정에 실패하였습니다.' });
    }
  };
  deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.itemService.deleteItem(id);
      return res
        .status(200)
        .json({ message: `id: ${id}의 메뉴가 삭제되었습니다.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '메뉴 삭제에 실패하였습니다.' });
    }
  };
}

export default ItemController;
