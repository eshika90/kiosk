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
        const getAmount = await this.placeOrderRepository.getOrder(id);
        if (getAmount[0] < getAmount[1]) {
          return '취소 불가';
        } else {
          return await this.placeOrderRepository.cancelOrder(state, id);
        }
      }
      return await this.placeOrderRepository.updateState(state, id);
    } catch (error) {
      throw error;
    }
  };
}

export default PlaceOrderService;
