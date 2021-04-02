import { fork } from 'child_process';
import { MultiplierRequest, GeneratedMultiplier } from '../models';

const mm = fork('./src/core/multiplier-manager/index.ts');
const multiplierQueue: GeneratedMultiplier[] = [];

mm.on('message', (mmResult: GeneratedMultiplier) => {
    multiplierQueue.push(mmResult);
});

function create(request: MultiplierRequest) {
    mm.send({
        batchId: request.batchId,
        number: request.number
    } as GeneratedMultiplier);
    return true;
}

function getAll() {
    return multiplierQueue;
}

function clearAll() {
    multiplierQueue.length = 0;
}

export const multiplierProcessor = {
    create,
    getAll,
    clearAll
};