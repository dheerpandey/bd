import express from 'express';
import { apiRouter } from '../controller';

export const rootRouter = express.Router();
rootRouter.use('/api', apiRouter);
