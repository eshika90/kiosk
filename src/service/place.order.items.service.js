import { PlaceOrderItemsRepository } from '../repository/place.order.items.repository';

export class PlaceOrderItemsService {
  _placeOrderItemsRepository = new PlaceOrderItemsRepository();

  create = async (itemName, amount) => {
    if (typeof itemName !== 'string' || typeof amount !== 'number') {
      throw new Error('itemName은 문자, amount는 숫자여야 합니다.');
    }

    return await this._placeOrderItemsRepository.create(itemName, amount);
  };
}
