import { Request, Response } from 'express';
import * as homeService from '../services/home';

/**
 * Gets the API information.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function getAppInfo(req: Request, res: Response) {
  const result = homeService.getAppInfo();

  res.json(result);
}
