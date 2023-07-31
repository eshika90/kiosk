import PlaceOrderService from '../service/placeOrderService.js';

class PlaceOrderController {
  placeOrderService = new PlaceOrderService();
  order = async (req, res, next) => {
    const { item_id, amount } = req.body;
    try {
      await this.placeOrderService.order(item_id, amount);
      return res.status(200).json({
        message: `아이템 아이디${item_id}번으로 ${amount}개가 발주되었습니다.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '아이템 발주에 실패하였습니다.' });
    }
  };
  updateState = async (req, res, next) => {
    const { state } = req.body;
    const { id } = req.params;
    try {
      await this.placeOrderService.updateState(state, id);
      return res.status(200).json({ message: '메뉴 발주 성공' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '메뉴 발주에 실패하였습니다.' });
    }
  };
}

export default PlaceOrderController;
