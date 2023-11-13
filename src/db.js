import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseConnection {
  connection;

  constructor() {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async databaseSync() {
    try {
      const connection = await this.connection.getConnection();
      console.log('Database is successfully connected!');
      connection.release();
    } catch (error) {
      console.error('Error connection to database: ', error.message);
      throw error;
    }
  }

  getConnection() {
    return this.connection;
  }
}
