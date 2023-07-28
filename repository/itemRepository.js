import { dbConnection } from '../app.js';

class ItemRepository {
  addItem = async (name, price, type, amount) => {
    try {
      console.log('레파지토리', dbConnection);
      const sql =
        'INSERT INTO item (name, price, type, amount) VALUES (?, ?, ?, ?)';
      const [result] = await dbConnection.query(sql, [
        [name, price, type, amount],
      ]);
      console.log(result);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  };
}

export default ItemRepository;
