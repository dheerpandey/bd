import { Batch, BatchRequest, GeneratedNumber } from '../../domain-model';
import { utility } from '../../utils';
import { Status } from '../enums/status.enum';

const batchQueue: Batch[] = [];
const requestQueue: BatchRequest[] = [];
let gmGetInterval: NodeJS.Timeout;
let mmGetInterval: NodeJS.Timeout;

function schedulePooling() {
    gmGetInterval = setInterval(() => {
        //get gm response.
    }, 2000);

    mmGetInterval = setInterval(() => {
        //get mm response.
    }, 2000);    
}

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
        }
        request.status = Status.InProcess;

    });
}

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
    schedulePooling();
}

function getAllBatches() {
    return batchQueue;
}

function clearBatch() {
    requestQueue.length = 0;
    batchQueue.length = 0;
    clearInterval(gmGetInterval);
    clearInterval(mmGetInterval);
}

export const batchProcessor = {
    startBatch,
    getAllBatches,
    clearBatch
};