import { DatabaseConnection } from '../db.js';

export class ItemsRepository {
  connection;

  constructor() {
    this.connection = new DatabaseConnection().getConnection();
  }

  getItems = async () => {
    const [allItems] = await this.connection.execute('SELECT * FROM item');
    return allItems;
  };

  getItemById = id => {
    const [findByIdItem] = this.connection.execute(
      'SELECT * FROM item WHERE id = ?',
      [id],
    );
    return findByIdItem;
  };

  getItemByName = async name => {
    const [findByNameItem] = await this.connection.execute(
      'SELECT * FROM item WHERE name = ?',
      [name],
    );
    return findByNameItem;
  };

  getTypeItems = async type => {
    const [findByTypeItems] = await this.connection.execute(
      'SELECT * FROM item WHERE `type` = ?',
      [type],
    );
    return findByTypeItems;
  };

  createItem = async (name, price, type) => {
    const [createdItem] = await this.connection.execute(
      'INSERT INTO item (name, price, type) VALUES (?, ?, ?)',
      [name, price, type],
    );
    return createdItem;
  };

  updateItem = async (name, price, type) => {
    const [updatedItem] = await this.connection.execute(
      'UPDATE item SET name = ?, price = ?, type = ? WHERE name = ?',
      [name, price, type, name],
    );
    if (updatedItem.affectedRows === 0) {
      throw new Error('찾을 수 없는 메뉴입니다.');
    } else {
      return true;
    }
  };

  deleteItem = async name => {
    const [deletedItem] = await this.connection.execute(
      'DELETE FROM item WHERE name = ?',
      [name],
    );
    if (deletedItem.affectedRows === 0) {
      throw new Error('찾을 수 없는 메뉴입니다.');
    } else {
      return true;
    }
  };
}
