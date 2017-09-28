import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import * as bodyParser from 'body-parser';
import * as redis from 'redis';

async function bootstrap() {
  const redisClient = redis.createClient();
  // if an error occurs, print it to the console
  redisClient.on('error', function (err) {
    console.log('Redis Error: ' + err);
  });

  const app = await NestFactory.create(ApplicationModule);
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(bodyParser.json());
  await app.listen(8080);
}
bootstrap();