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
}

export default ItemRepository;
