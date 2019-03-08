require('dotenv').config();
import { application } from './application';

const port = parseInt(process.env.PORT) || 3000;

application.run(port);