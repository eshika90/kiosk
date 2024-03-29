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

  getItemById = async id => {
    const [row] = await this.connection.execute(
      'SELECT * FROM item WHERE id = ?',
      [id],
    );
    return row[0];
  };

  getItemByName = async name => {
    const findByNameItem = await this.connection.execute(
      'SELECT * FROM `item` WHERE name = ?',
      [name],
    );
    return findByNameItem;
  };

  getItems = async type => {
    if (type === 'all') {
      const [result] = await this.connection.execute('SELECT * FROM item');
      return result;
    } else {
      const [findByTypeItems] = await this.connection.execute(
        'SELECT * FROM item WHERE `type` = ?',
        [type],
      );
      return findByTypeItems;
    }
  };

  createItem = async item => {
    const { name, price, type } = item;
    const [createdItem] = await this.connection.execute(
      'INSERT INTO item (name, price, type, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [name, price, type],
    );
    return createdItem;
  };

  updateItem = async item => {
    const { name, modifiedName, price, type } = item;
    return await this.connection.execute(
      'UPDATE item SET name = ?, price = ?, type = ? WHERE name = ?',
      [modifiedName, price, type, name],
    );
  };

  deleteItem = async name => {
    const [deletedItem] = await this.connection.execute(
      'DELETE FROM item WHERE name = ?',
      [name],
    );
    return deletedItem;
  };
}
