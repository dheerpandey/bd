import express from 'express';
import asyncHandler from 'express-async-handler';
import { batchProcessor } from '../core';
export const batchRouter = express.Router();

// To check, if service is up and running.
batchRouter.get(
    '/ping',
    asyncHandler(async (req, res) => {
        res.sendStatus(200);
    })
);

batchRouter.post(
    '/start',
    asyncHandler(async (req, res) => {
        const batch = await batchProcessor.startBatch(req.body.batchSize, req.body.numbersPerBatch);
        console.log('BATCH START=>', batch);
        res.sendStatus(201);
    })
);

batchRouter.get(
    '/get-all',
    asyncHandler(async (req, res) => {
        const batch = await batchProcessor.getAllBatches();
        res.send(batch);
    })
);

batchRouter.delete(
    '/clear-all',
    asyncHandler(async (req, res) => {
        await batchProcessor.clearBatch();
        res.sendStatus(200);
    })
);