import { fork } from 'child_process';
import { GeneratedNumber } from '../domain-model';
import { NumberRequest } from '../domain-model/number.request.model';

const gm = fork('./src/core/generator-manager/index.ts');

const numberQueue: GeneratedNumber[] = [];

gm.on('message', (gmResult: GeneratedNumber) => {
    numberQueue.push(gmResult);
});

function create(request: NumberRequest) {
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