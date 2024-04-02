import dotenv from 'dotenv';
import Http from 'http'; // 기본 node.js 라이브러리
import { ExpressApp } from './app.js';
import { DatabaseConnection } from './db.js';

dotenv.config();

export class Server {
  expressApp = new ExpressApp();
  httpServer; // javascript에서는 안 써도 되지만 선언을 typescript에서 미리 해놓고 사용하기 때문에 조호영튜터님은 선언을 하는것을 선호함
  databaseConnection = new DatabaseConnection();

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app); // app을 http서버로 실행시킴
  }

  runServer = () => {
    try {
      this.databaseConnection.databaseSync();
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };
  serverListen = () => {
    const { PORT: port, HOST: host } = process.env;
    return this.httpServer.listen(port, () => {
      console.log(`Server is running on: http://${host}:${port}`);
    });
  };

  serverErrorHandler = (error) => {
    console.log('Server run error: ', error.message);
  };
}

const server = new Server();
server.runServer();
