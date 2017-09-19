import * as fs from 'fs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as stream from 'stream';

import config from '../config/config';

const { level, path, maxFiles } = config.logging;
const timestamp = () => new Date().toISOString();

// Create log path if it does not exist
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

/**
 * Custom formatter for the logs.
 *
 * @param {Object} options
 * @returns {String}
 */
function formatter(options: any) {
  const logLevel = winston.config.colorize(
    options.level,
    options.level.toUpperCase()
  );
  const message = options.message ? options.message : '';
  const hasMeta = options.meta && Object.keys(options.meta).length;
  const meta = hasMeta ? '\n' + JSON.stringify(options.meta, null, 4) : '';

  return `${options.timestamp()}  [ ${logLevel} ]  ${message}  ${meta}`;
}

const transports = [];

// Add transports if not test environment.
if (!config.app.isTestEnvironment) {
  transports.push(
    new winston.transports.Console({
      level,
      formatter,
      timestamp,
      colorize: true
    })
  );
  transports.push(
    new winston.transports.DailyRotateFile({
      level,
      maxFiles,
      formatter,
      timestamp,
      prepend: true,
      datePattern: 'yyyy-MM-dd',
      filename: `${path}/-log.log`
    })
  );
}

// Create a logger using the configuration.
const logger = new winston.Logger({ transports });

/**
 * A writable stream for winston logging.
 */
export const logStream = new stream.Writable({
  write(message) {
    logger.info(message.toString());
  }
});

export default logger;
