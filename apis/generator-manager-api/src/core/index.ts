import { fork } from 'child_process';
import { GeneratedNumber } from '../models';
import { GeneratorRequest } from '../models/generator-request.model';

const gm = fork('./src/core/generator-manager/index.ts');

const numberQueue: GeneratedNumber[] = [];

gm.on('message', (gmResult: GeneratedNumber) => {
    numberQueue.push(gmResult);
});

function create(request: GeneratorRequest) {
    gm.send({
        batchId: request.batchId,
        numbersPerBatch: request.numbersPerBatch
    });
    return true;
}

function getAll() {
    return numberQueue;
}

function clearAll() {
    numberQueue.length = 0;
}

export const numberProcessor = {
    create,
    getAll,
    clearAll
};