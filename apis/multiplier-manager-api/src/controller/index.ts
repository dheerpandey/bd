import express from 'express';
import { multiplierRouter } from './multiplier-controller';

export const apiRouter = express.Router();
apiRouter.use('/multiplier', multiplierRouter);
