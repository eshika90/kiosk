import express from 'express';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppsettings();
    this.setAppRouter();
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
}
