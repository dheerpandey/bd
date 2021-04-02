import express from 'express';
import asyncHandler from 'express-async-handler';
import { multiplierProcessor } from '../core';
import { MultiplierRequest } from '../models';
import { multiplierRequestSchema } from '../schemas/multiplier-request.schema';
const Joi = require('joi');

export const multiplierRouter = express.Router();

// To check, if service is up and running.
multiplierRouter.get(
    '/ping',
    asyncHandler(async (req, res) => {
        res.sendStatus(200);
    })
);

multiplierRouter.post(
    '/create',
    asyncHandler(async (req, res) => {
        try {
            const { error } = multiplierRequestSchema.validate(req.body);
            const valid = error == null;
            if (valid) {
                multiplierProcessor.create({
                    batchId: Number(req.body.batchId),
                    number: Number(req.body.number),
                } as MultiplierRequest);
                res.status(201).json({
                    message: 'Request placed successfully!!'
                });
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

multiplierRouter.get(
    '/get-all',
    asyncHandler(async (req, res) => {
        try {
            const batch = await multiplierProcessor.getAll();
            res.send(batch);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    })
);

multiplierRouter.delete(
    '/clear-all',
    asyncHandler(async (req, res) => {
        try {
            await multiplierProcessor.clearAll();

            res.status(200).json({
                message: 'All the data for current batch have been cleared!!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    }));
