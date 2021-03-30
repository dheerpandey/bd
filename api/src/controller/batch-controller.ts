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
        try {
            await batchProcessor.startBatch(req.body.batchSize, req.body.numbersPerBatch);
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(500);
        }

    })
);

batchRouter.get(
    '/get-all',
    asyncHandler(async (req, res) => {
        try {
            const batch = await batchProcessor.getAllBatches();
            res.send(batch);
        } catch (error) {
            res.sendStatus(500);
        }
    })
);

batchRouter.delete(
    '/clear-all',
    asyncHandler(async (req, res) => {
        try {
            await batchProcessor.clearBatch();
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    })
);