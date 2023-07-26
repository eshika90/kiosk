import dotenv from 'dotenv';
import Http from 'node:http';
dotenv.config();

import express from 'express';

export class ExpressApp {
  app = express();
  httpServer;

  constructor() {
    this.setAppsettings();
    this.setAppRouter();
    this.httpServer = new Http.Server();
  }

  setAppsettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };

  setAppRouter = () => {
    this.app.use('/api', (req, res, next) => {
      return res.status(200), json('hello');
    });
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
    const { PORT: port, HOST: host } = process.env;
    return this.httpServer.listen(port, () => {
      console.log(`Server is Running on http://${host}:${port}`);
    });
  };
  serverErrorHandler = (error) => {
    console.log('Server run error: ', error.message);
  };
}
const expressApp = new ExpressApp();
expressApp.runServer();
