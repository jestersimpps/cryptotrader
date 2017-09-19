import * as url from 'url';
import { Request } from 'express';

/**
 * Returns url.
 *
 * @param req
 * @returns {string}
 */
export function getFullUrl(req: Request) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl + req.path
  });
}
