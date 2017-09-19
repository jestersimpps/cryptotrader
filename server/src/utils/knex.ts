import * as knex from 'knex';
import config from '../config/config';

export default knex(config.database);
