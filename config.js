const db = {
  development: {
    username: 'root',
    password: 'sparta1234',
    database: 'kiosk',
    host: 'express-database.chsegd7gavec.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

module.exports = db;
