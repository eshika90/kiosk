import expressApp from '../app.js';
class PlaceOrderRepository {
  order = async (item_id, amount) => {
    const sql = 'INSERT INTO place_order_item (item_id, amount) VALUES (?, ?)';
    await expressApp.dbConnection.query(sql, [item_id, amount]);
  };
  updateState = async (state, id) => {
    const sql = 'UPDATE place_order_item SET state=? WHERE id=?';
    await expressApp.dbConnection.query(sql, [state, id]);
  };
  completeOrder = async (state, id) => {
    try {
      await expressApp.dbConnection.beginTransaction();
      const placeOrderSql = 'UPDATE place_order_item SET state=? WHERE id=?';
      await expressApp.dbConnection.query(placeOrderSql, [state, id]);
      const updateItemSql =
        'SELECT amount, item_id FROM place_order_item WHERE id=?';
      const updateItem = await expressApp.dbConnection.query(updateItemSql, [
        id,
      ]);
      const itemSql = 'UPDATE item SET amount=? WHERE id=?';
      await expressApp.dbConnection.query(
        itemSql,
        Object.values(updateItem[0][0])
      );
      await expressApp.dbConnection.commit();
    } catch (err) {
      await expressApp.dbConnection.rollback();
      return err;
    }
  };
  cancelOrder = async (state, id) => {
    // 메뉴 발주했던 데이터를 삭제하지 않고 수량만 0으로 감소시킴
    const sql = 'UPDATE place_order_item SET amount=0, state=? WHERE id=?';
    await expressApp.dbConnection.query(sql, [state, id]);
    return '발주취소';
  };
  getOrder = async (id) => {
    const sql =
      'SELECT i.amount FROM place_order_item p INNER JOIN item i ON p.item_id=i.id WHERE p.id=?';
    const sql2 =
      'SELECT p.amount FROM place_order_item p INNER JOIN item i ON p.item_id=i.id WHERE p.id=?';
    const recentAmount = await expressApp.dbConnection.query(sql, [id]);
    const orderAmount = await expressApp.dbConnection.query(sql2, [id]);
    const result = [
      Object.values(recentAmount[0][0]),
      Object.values(orderAmount[0][0]),
    ];
    return result;
  };
}

export default PlaceOrderRepository;
