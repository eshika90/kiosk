import PlaceOrderRepository from '../repository/placeOrderRepository.js';
import ItemRepository from '../repository/itemRepository.js';

class PlaceOrderService {
  placeOrderRepository = new PlaceOrderRepository();
  itemRepository = new ItemRepository();
  order = async (item_id, amount) => {
    try {
      return await this.placeOrderRepository.order(item_id, amount);
    } catch (error) {
      throw error;
    }
  };
  updateState = async (state, id) => {
    try {
      if (state == 1) {
        return await this.placeOrderRepository.updateState(state, id);
      }
      if (state == 2) {
        return await this.placeOrderRepository.completeOrder(state, id);
      }
      if (state == 3) {
        const orderAmount = await this.placeOrderRepository.getOrder(id);
        const recentAmount = await this.itemRepository.getAmount(id);
        if (orderAmount > recentAmount) {
          return res.status(400).json({
            message: '현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.',
          });
        } else {
          return await this.placeOrderRepository.cancelOrder(id);
        }
      }
      return await this.placeOrderRepository.updateState(state, id);
    } catch (error) {
      throw error;
    }
  };
}

export default PlaceOrderService;
