import * as dotenv from 'dotenv';
import * as pkg from '../../package.json';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';
const PORT = (isTestEnvironment && 8888) || process.env.PORT || 8080;

export default {
  app: {
    name: (pkg as any).name,
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: process.env.APP_HOST,
    baseUrl: process.env.API_BASE_URL,
    port: PORT,
    templatePath: `${__dirname}/../templates`,
    staticPath: process.env.STATIC_PATH || 'api-static',
    isTestEnvironment
  },
  logging: {
    path: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'info',
    maxFiles: process.env.LOGGING_MAX_FILES || 5
  },
  database: {
    client: 'pg',
    connection: {
      charset: 'utf8',
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || '127.0.0.1'
    }
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS || '11',
    accessTokenExpiry: process.env.ACCESS_TOKEN_DURATION || '300000',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_DURATION || '86400000',
    accessTokenSalt: process.env.ACCESS_TOKEN_SALT,
    refreshTokenSalt: process.env.REFRESH_TOKEN_SALT
  },
  pagination: {
    maxRows: 25,
    page: 1
  },
  aws: {
    path: process.env.AWS_BUCKET_PATH,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME
  },
  ses: {
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    senderAddress: process.env.SENDER_ADDRESS
  }
};
