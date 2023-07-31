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
  getItem = async () => {
    try {
      return await this.itemRepository.getItem();
    } catch (e) {
      console.error(e);
      throw error;
    }
  };
  getTypeItem = async (type) => {
    try {
      return await this.itemRepository.getTypeItem(type);
    } catch (e) {
      console.error(e);
      throw error;
    }
  };
  modifyItem = async (name, price, type, amount, id) => {
    try {
      return await this.itemRepository.modifyItem(
        name,
        price,
        type,
        amount,
        id
      );
    } catch (e) {
      console.error(e);
      throw error;
    }
  };
  deleteItem = async (id) => {
    try {
      await this.itemRepository.deleteItem(id);
    } catch (e) {
      console.error(e);
      throw error;
    }
  };
}

export default ItemService;
