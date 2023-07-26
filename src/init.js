import dotenv from 'dotenv';
import Http from 'node:http';
import { ExpressApp } from './app.js';

dotenv.config();

export class Server {
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  //   databaseConnection = () => {
  //     return this.sequelize.authenticate() // 현재 쿼리문으로 생성 중
  //   };

  sequelizeSync = () => {
    return this.sequelize.sync({ force: false });
  };

  runServer = () => {
    try {
      // await this.databaseConnection()
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };

  serverListen = () => {
    console.log(process.env.HOST);
    const { PORT: port, HOST: host } = process.env;
    return this.httpServer.listen(port, () => {
      console.log(`Server is Running on http://${host}:${port}`);
    });
  };

  serverErrorHandler = (error) => {
    console.log('Server run error: ', error.message);
  };
}
const server = new Server();
server.runServer();
