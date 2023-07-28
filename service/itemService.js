import ItemRepository from '../repository/itemRepository.js';

class ItemService {
  itemRepository = new ItemRepository();

  addItem = async (name, price, type, amount) => {
    try {
      return await this.itemRepository.addItem(name, price, type, amount);
    } catch (e) {
      console.error(e);
      throw error;
    }
  };
}

export default ItemService;
