import { PlaceOrderItemsRepository } from '../repository/place.order.items.repository';
import { ItemsRepository } from '../repository/items.repository';
import { Messages } from '../error/messages';
import { ValidationCheck } from '../utils/validationCheck';
import orderItemState from '../constants/orderItemState.js';

export class PlaceOrderItemsService {
  _placeOrderItemsRepository = new PlaceOrderItemsRepository();
  _itemRepo = new ItemsRepository();

  create = async (name, amount) => {
    if (!name) {
      return {
        code: 400,
        message: Messages.WrongName,
      };
    }
    if (!amount || amount <= 0) {
      return {
        code: 400,
        message: Messages.WrongAmount,
      };
    }
    const findItem = await this._itemRepo.getItemByName(name);
    if (!findItem) {
      return {
        code: 400,
        message: Messages.NoneExist,
      };
    }
    return {
      code: 200,
      data: await this._placeOrderItemsRepository.create(
        findItem.id,
        amount,
        orderItemState.ordered,
      ),
    };
  };

  // 주문이 수정되는 경우
  // 1. 발주한 물품이 와서 완료된 경우
  // 2. 발주한 물품을 취소하는 경우
  update = async (orderId, state) => {
    console.log('service실행');
    if (!ValidationCheck(orderItemState, state)) {
      return {
        code: 400,
        message: Messages.WrongState,
      };
    }

    const orderReceipt = await this._placeOrderItemsRepository.findReceipt(
      orderId,
    );
    if (!orderReceipt) {
      return {
        code: 400,
        message: Messages.NoneExistOrder,
      };
    }
    // 현재 상태와 변경 상태가 동일한 경우 바꿀 필요 없음
    if (state === orderReceipt.state) {
      return {
        code: 400,
        message: Messages.CannotChangeState,
      };
    }

    // 취소된 주문은 완료시킬 수 없음
    if (
      state === orderItemState.complete &&
      orderReceipt.state === orderItemState.cancel
    ) {
      return {
        code: 400,
        message: Messages.CannotChangeState,
      };
    }

    // 완료된 주문은 취소시킬 수 없음
    if (
      state === orderItemState.cancel &&
      orderReceipt.state === orderItemState.complete
    ) {
      return {
        code: 400,
        message: Messages.CannotChangeState,
      };
    }
    // 주문이 완료되는 경우
    if (
      state === orderItemState.complete &&
      orderReceipt.state === orderItemState.ordered
    ) {
      const { item_id, amount } = orderReceipt;
      const result = await this._placeOrderItemsRepository.updateState({
        orderId,
        state,
        item_id,
        amount,
      });
      if (!result) {
        return {
          code: 400,
        };
      }
      return {
        code: 200,
      };
    }

    // 주문을 취소하는 경우
    if (
      state === orderItemState.cancel &&
      orderReceipt.state === orderItemState.ordered
    ) {
      await this._placeOrderItemsRepository.updateState({
        orderId,
        state,
      });
      return {
        code: 200,
      };
    }
  };
}
