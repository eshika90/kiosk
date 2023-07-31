import expressApp from '../app.js';
class ItemRepository {
  addItem = async (name, price, type, amount) => {
    try {
      const sql = 'INSERT INTO item (name, price, type, amount) VALUES (?)';
      const [result] = await expressApp.dbConnection.query(sql, [
        [name, price, type, amount],
      ]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  };
  getItem = async () => {
    try {
      const sql = 'SELECT * FROM item';
      const allItems = await expressApp.dbConnection.query(sql);
      return allItems[0];
    } catch (error) {
      throw error;
    }
  };
  getTypeItem = async (type) => {
    try {
      const sql = 'SELECT * FROM item where type=?';
      const typeAllItems = await expressApp.dbConnection.query(sql, [type]);
      return typeAllItems[0];
    } catch (error) {
      throw error;
    }
  };
  modifyItem = async (name, price, type, amount, id) => {
    try {
      const sql =
        'UPDATE item SET name=?, price=?, type=?, amount=? where id =?';
      const updateItem = await expressApp.dbConnection.query(sql, [
        name,
        price,
        type,
        amount,
        id,
      ]);
      const updateItemQuery = 'SELECT * FROM item WHERE id =?';
      const updatedItem = await expressApp.dbConnection.query(updateItemQuery, [
        id,
      ]);
      return updatedItem[0];
    } catch (error) {
      throw error;
    }
  };
  deleteItem = async (id) => {
    try {
      const sql = 'DELETE FROM item WHERE id =?';
      await expressApp.dbConnection.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  };
}

export default ItemRepository;
