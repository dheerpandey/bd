import express from 'express';
import { gmRouter } from './generator-controller';

export const apiRouter = express.Router();

apiRouter.use('/generator', gmRouter);
