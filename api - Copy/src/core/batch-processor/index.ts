import { Batch, BatchRequest, GeneratedNumber } from '../../domain-model';
import { batchRequestRepository, batchRepository } from '../../repositoties';
import { fork } from 'child_process';
import { utility } from '../../utils';
import { Status } from '../enums/status.enum';

const gm = fork('./src/core/generator-manager/index.ts');
const batchQueue: Batch[] = [];
const requestQueue: BatchRequest[] = [];

gm.on('message', (gmResult) => {
    const gmResultObject = JSON.parse(JSON.stringify(gmResult));

    const index = batchQueue.findIndex(i => i.requestId === gmResultObject.requestId && i.id === gmResultObject.batchId);

    if (index >= 0) {
        batchQueue[index].generatedNumbers.push({
            number: gmResultObject.generatedNumber,
        } as GeneratedNumber);
        batchQueue[index].status = Status.InProcess;
        sendToMultiplier({
            requestId: batchQueue[index].requestId,
            batchId: batchQueue[index].id,
            number: gmResultObject.generatedNumber
        } as GeneratedNumber);
    } else {
        console.log('Orphan GM Response ', gmResult);
    }
});

function startNewBatch() {
    requestQueue.filter(i => i.status === Status.Pending).forEach(request => {
        for (let index = 0; index < request.batchSize; index++) {
            const batch = {
                requestId: request.id,
                id: utility.getBatchId(batchQueue.map(i => i.id)),
                generatedNumbers: [] as unknown as GeneratedNumber,
                status: Status.Pending
            } as unknown as Batch

            batchQueue.push(batch);
            gm.send({
                requestId: batch.requestId,
                batchId: batch.id,
                numbersPerBatch: request.numbersPerBatch
            });
        }
        request.status = Status.InProcess;

    });
}
// GM SEND RECEIVE MESSAGES END.

// MM SEND RECEIVE MESSAGES START.
const mm = fork('./src/core/multiplier-manager/index.ts');
function sendToMultiplier(batch: GeneratedNumber) {
    mm.send(batch);
}

mm.on('message', (mmResult: GeneratedNumber) => {
    // console.log('mmResult=>', typeof mmResult);
    const index = batchQueue.findIndex(i => i.requestId === mmResult.requestId && i.id === mmResult.batchId);

    if (index >= 0) {
        const generatedNumberIndex = batchQueue[index].generatedNumbers.findIndex(i => i.number === mmResult.number && !i.multiplierNumber);
        batchQueue[index].generatedNumbers[generatedNumberIndex].multiplierNumber = mmResult.multiplierNumber;
        const requestIndex = requestQueue.findIndex(i => i.id === mmResult.requestId);
        if (Number(requestQueue[requestIndex].numbersPerBatch) === batchQueue[index].generatedNumbers.length &&
            batchQueue[index].generatedNumbers.filter(i => !i.multiplierNumber).length <= 0) {
            batchQueue[index].status = Status.Received;
        }
    } else {
        console.log('Orphan MM Response ', mmResult);
    }
});
// MM SEND RECEIVE MESSAGES END.


function startBatch(batchSize: number, numbersPerBatch: number) {
    if (requestQueue.length <= 0) {
        requestQueue.push({
            batchSize,
            numbersPerBatch,
            status: Status.Pending
        } as BatchRequest);

    } else {
        throw new Error("Can't start a new batch, a batch is already running.");
    }
    startNewBatch();
}

function getAllBatchRequests() {
    return requestQueue;
}

function getAllBatches() {
    return batchQueue;
}

function clearBatch() {
    requestQueue.length = 0;
    batchQueue.length = 0;
}

export const batchProcessor = {
    startBatch,
    getAllBatchRequests,
    getAllBatches,
    clearBatch
};