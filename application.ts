import bodyParser from 'body-parser';
import express from 'express';
import { baseRouter } from './src/routes/base-router';
import { Express } from 'express-serve-static-core';

const morgan = require('morgan');

class Application {

  private readonly app: Express;

  constructor() {
    this.app = express();
    this.setUp();
  }

  run(port: number) {
    this.app.listen(port, () => console.log('Listening on port ' + port));
  }

  private setUp(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    baseRouter.setUpRoutes(this.app);
  }
}

const application = new Application();

export { application };
