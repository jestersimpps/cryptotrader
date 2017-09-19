import { Router } from 'express';

import * as homeController from './controllers/home';

const router = Router();

router.get('/', homeController.getAppInfo);

export default router;
