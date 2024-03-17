import { PlaceOrderItemsService } from '../service/place.order.items.service';

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
      if (!itemName || !amount)
        throw new Error('메뉴의 이름과 수량은 필수 값입니다.');
      const placeOrderSuccess = await this._placeOrderItemsService.create(
        itemName,
        amount,
      );
      const orderId = placeOrderSuccess[0].insertId;
      res.status(200).json({
        message: `발주번호${orderId}로 ${itemName}이 ${amount}개 발주신청 되었습니다.`,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errorMessage: e.message });
    }
  };
}
