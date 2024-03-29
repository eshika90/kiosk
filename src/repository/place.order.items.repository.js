import { DatabaseConnection } from '../db.js';

export class PlaceOrderItemsRepository {
  connection;

  constructor() {
    this.connection = new DatabaseConnection().getConnection();
  }

  create = async (itemId, amount, state) => {
    const [createdReceipt] = await this.connection.execute(
      'INSERT INTO place_order_item (item_id, amount, state, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [itemId, amount, state],
    );
    return createdReceipt;
  };

  findReceipt = async id => {
    const [orderReceipt] = await this.connection.execute(
      'SELECT * FROM place_order_item where (id) VALUES (?)',
      [id],
    );
    return orderReceipt;
  };

  updateState = async (id, state) => {
    return await this.connection.execute(
      'UPDATE place_order_item set state = ? WHERE id = ?',
      [state, id],
    );
  };
}
