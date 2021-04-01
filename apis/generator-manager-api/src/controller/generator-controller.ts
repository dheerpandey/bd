import express from 'express';
import asyncHandler from 'express-async-handler';
import { numberGeneratorSchema } from '../schemas/number-generator.schema';
import { numberProcessor } from "../core";
import { NumberRequest } from '../domain-model/number.request.model';

export const gmRouter = express.Router();
gmRouter.get(
    '/ping',
    asyncHandler(async (req, res) => {
        res.sendStatus(200);
    })
);

gmRouter.post(
    '/create',
    asyncHandler(async (req, res) => {
        try {
            const { error } = numberGeneratorSchema.validate(req.body);
            const valid = error == null;
            if (valid) {
                numberProcessor.create({
                    batchId: req.body.batchId,
                    numbersPerBatch: req.body.numbersPerBatch,
                } as NumberRequest);
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

gmRouter.get(
    '/get-all',
    asyncHandler(async (req, res) => {
        try {
            const batch = await numberProcessor.getAll();
            res.send(batch);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    })
);

gmRouter.delete(
    '/clear-all',
    asyncHandler(async (req, res) => {
        try {
            await numberProcessor.clearAll();
            
            res.status(200).json({
                message: 'All the data for current batch have been cleared!!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    })
);
