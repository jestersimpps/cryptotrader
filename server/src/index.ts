import 'babel-polyfill';

import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes';
import config from './config/config';
import logger, { logStream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev', { stream: logStream }));
app.use(bodyParser.json());

// API Routes
app.use('/', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

logger.info('Application Environment: ' + app.get('env'));
logger.debug('Debug logs are enabled');

app.listen(config.app.port, () =>
  logger.info(`Listening on port ${config.app.port}`)
);

export default app;
