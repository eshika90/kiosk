import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseConnection {
  connection;

  // createPool : 연결 풀을 생성하여 연결을 관리하고 재사용
  // 동시요청 및 트랜잭션 관리가 필요한 경우 사용
  // createConnection : 데이터베이스와 연결된 커넥션 객체 하나를 생성
  // 단일연결을 생성
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
