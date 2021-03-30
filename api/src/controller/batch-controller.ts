import express from 'express';
import asyncHandler from 'express-async-handler';
import { batchProcessor } from '../core';
import { batchRequestSchema } from '../schemas/batch-request.schema';
const Joi = require('joi');

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
            const { error } = batchRequestSchema.validate(req.body);
            const valid = error == null;
            console.log(JSON.stringify(valid));
            if (valid) {
                batchProcessor.startBatch(req.body.batchSize, req.body.numbersPerBatch);
                res.sendStatus(201);
            } else {
                const { details } = error;
                const message = details.map(i => i.message).join(',');
                res.status(400).json({ message: message });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
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
            res.status(500).json({
                message: error.message
            });
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
            res.status(500).json({
                message: error.message
            });
        }
    })
);
