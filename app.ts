import bodyParser from 'body-parser';
import express from 'express';
import { baseRouter } from './src/routes/base-router';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
baseRouter.setUpRoutes(app);

app.listen(port, () => console.log('Listening on port ' + port));
