import dotenv from 'dotenv';
// import Http from 'node:http'; <<
dotenv.config();

import express from 'express';
import mysql from 'mysql2/promise';
import itemRouter from './router/itemRoutes.js';

export const databaseConnection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

class ExpressApp {
  app = express();
  dbConnection;
  setAppsettings = () => {
    this.app.use(express.json());
  };

  setAppRouter = () => {
    this.app.use('/api', itemRouter),
      //에러 핸들링 미들웨어
      this.app.use((error, request, response, next) => {
        response.status(400).json({
          success: false,
          error: error.message,
        });
      });
  };

  runServer = async () => {
    try {
      this.setAppsettings();
      await this.runDatabase();
      this.setAppRouter();
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };
  runDatabase = async () => {
    try {
      this.dbConnection = await mysql.createConnection(databaseConnection);
      console.log(`${databaseConnection.database}로 연결되었습니다.`);
    } catch (e) {
      console.error('Error: ', e);
    }
  };
  serverListen = () => {
    const { PORT: port, HOST: host } = process.env;
    return this.app.listen(port, () => {
      console.log(`Server is Running on http://${host}:${port}`);
    });
  };
  serverErrorHandler = (error) => {
    console.log('Server run error: ', error.message);
  };

  // 서버 종료 시 데이터 베이스 연결 종료하는 함수
  closeDatabaseconnection = async () => {
    if (this.dbConnection) {
      await this.dbConnection.end();
    }
  };
}

const expressApp = new ExpressApp();
expressApp.runServer();
expressApp.setAppRouter();

export default expressApp;
// 프로그램이 종료되면 데이터베이스 연결도 종료
process.on('exit', () => {
  expressApp.closeDatabaseconnection();
});
