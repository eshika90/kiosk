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
    const placeOrderSql = 'UPDATE place_order_item SET state=? WHERE id=?';
    await expressApp.dbConnection.query(placeOrderSql, [state, id]);
    const updateItemSql =
      'SELECT amount, item_id FROM place_order_item WHERE id=?';
    const updateItem = await expressApp.dbConnection.query(updateItemSql, [id]);
    const itemSql = 'UPDATE item SET amount=? WHERE id=?';
    console.log(Object.values(updateItem[0][0]));
    await expressApp.dbConnection.query(
      itemSql,
      Object.values(updateItem[0][0])
    );
  };
  cancelOrder = async (id) => {
    const sql = 'DELETE FROM place_order_item WHERE id=?';
    await expressApp.dbConnection.query(sql, [id]);
  };
}

export default PlaceOrderRepository;
