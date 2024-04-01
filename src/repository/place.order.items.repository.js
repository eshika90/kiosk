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
      'SELECT * FROM place_order_item WHERE id = ?',
      [id],
    );
    return orderReceipt[0];
  };

  updateState = async item => {
    try {
      const { orderId, state, item_id, amount } = item;
      if (!item_id || !amount) {
        return await this.connection.execute(
          'UPDATE place_order_item set state = ? WHERE id = ?',
          [state, orderId],
        );
      }
      // 트랜잭션 시작 실행부
      await this.connection.query('START TRANSACTION');
      // item테이블의 amount 변경
      const [itemResult] = await this.connection.execute(
        'UPDATE item SET amount = ? WHERE id = ?',
        [amount, item_id],
      );
      // place_order_item테이블의 상태 변경
      const [placeOrderResult] = await this.connection.execute(
        'UPDATE place_order_item set state = ? WHERE id = ?',
        [state, orderId],
      );
      if (
        itemResult.affectedRows === 0 ||
        placeOrderResult.affectedRows === 0
      ) {
        await this.connection.execute('ROLLBACK');
        return false;
      }
      await this.connection.execute('COMMIT');
      return true;
    } catch (error) {
      console.log(error);
      await this.connection.execute('ROLLBACK');
    }
  };
}
