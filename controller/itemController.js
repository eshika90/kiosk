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
}

export default ItemController;
