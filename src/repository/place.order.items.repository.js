import { DatabaseConnection } from '../db.js';

export class PlaceOrderItemsRepository {
  connection;

  constructor() {
    this.connection = new DatabaseConnection().getConnection();
  }

  create = async (itemName, amount) => {
    const findByidName = await this.connection.execute(
      'SELECT * FROM item WHERE name = ?',
      [itemName],
    );
    if (!findByidName.length) throw new Error('존재하지 않는 메뉴입니다.');
    else {
      const itemId = findByidName[0][0].id;
      return this.connection.execute(
        'INSERT INTO place_order_item (item_id, amount, state, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [itemId, amount, 0],
      );
    }
  };
}
