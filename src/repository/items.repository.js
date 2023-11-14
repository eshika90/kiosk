import { DatabaseConnection } from '../db.js';

export class ItemsRepository {
  connection;

  constructor() {
    this.connection = new DatabaseConnection().getConnection();
  }

  async getItems() {
    try {
      const [allItems, fields] = await this.connection.execute(
        'SELECT * FROM item',
      );
      return allItems;
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }

  async createItem(name, price, type) {
    await this.connection.execute(
      `INSERT INTO item (name, price, type) VALUES (${name}, ${price}, ${type}`,
    );
    const createdItem = await this.connection.execute(
      'SELECT LAST_INSERT_ID()',
    );
    return createdItem;
  }
}
