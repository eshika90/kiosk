import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

export class ExpressApp {
  app = express(); // express() 라고 실행해주어도 되지만 app이라고 명시를 해줌

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  };

  setAppRouter = () => {
    this.app.use('/api', routes, (error, req, res, next) => {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    });

    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'pong' });
    });
  };
}