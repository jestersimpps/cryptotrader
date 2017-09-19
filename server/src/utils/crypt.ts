import * as bcrypt from 'bcrypt';
import config from '../config/config';

/**
 * Create a bcrypt hash for a string.
 *
 * @param {string} value
 * @returns {Promise<any>}
 */
export async function hash(value: string): Promise<any> {
  const saltRounds = parseInt(config.auth.saltRounds, 10);

  return bcrypt.hash(value, saltRounds);
}

/**
 * Compare a string with the hash.
 *
 * @param {string} value
 * @param {string} hashedValue
 * @returns {Promise<boolean>}
 */
export async function compare(
  value: string,
  hashedValue: string
): Promise<boolean> {
  return bcrypt.compare(value, hashedValue);
}
