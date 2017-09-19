import config from '../config/config';
import AppInformation from '../domain/response/AppInformation';

/**
 * Get application information.
 *
 * @returns {AppInformation}
 */
export function getAppInfo(): AppInformation {
  return {
    name: config.app.name,
    version: config.app.version
  };
}
