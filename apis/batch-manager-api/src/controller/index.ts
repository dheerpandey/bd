import express from 'express';
import { batchRouter } from './batch-controller';

export const apiRouter = express.Router();
apiRouter.use('/batch', batchRouter);
