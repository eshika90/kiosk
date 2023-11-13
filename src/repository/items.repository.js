import { DatabaseConnection } from '../db.js';

export class ItemsRepository {
  connection;

  constructor() {
    this.connection = new DatabaseConnection().getConnection();
  }

  async getItems() {
    try {
      const [allItems, fields] = await this.connection.execute('SELECT * FROM item');
      return allItems;
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }
}
