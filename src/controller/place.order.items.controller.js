import { PlaceOrderItemsService } from '../service/place.order.items.service';
import { Messages } from '../error/messages.js';

export class PlaceOrderItemsController {
  _placeOrderItemsService = new PlaceOrderItemsService();

  // 발주하기
  // 1) body로 메뉴의 이름과 수량을 받아온다. (수량은 100개 이하로 한정)
  // 2) 메뉴가 존재하는 메뉴인지 확인
  // 3) 메뉴가 존재한다면 발주를 신청
  // 4) 발주 대기상태 state => 대기 중
  // 5) 물건을 받았으면 대기 => 완료상태, item테이블의 수량이 변경

  // 발주서 만들기
  create = async (req, res) => {
    try {
      const { itemName, amount } = req.body;
      const { code, data, message } = await this._placeOrderItemsService.create(
        itemName,
        amount,
      );
      res
        .status(code)
        .json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errorMessage: e.message });
    }
  };

  // 주문 수정은 취소, 완료 두 가지 선택만 받을 수 있다.
  // 주문을 수정하려면 주문 id를 받아와야한다.(생성된 pk)
  update = async (req, res) => {
    try {
      const { orderId, state } = req.body;
      console.log(state);
      const { code, data, message } = await this._placeOrderItemsService.update(
        orderId,
        state,
      );
      res
        .status(code)
        .json({ ...(data && { data }), ...(message && { message }) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errorMessage: Messages.ServerError });
    }
  };
}
