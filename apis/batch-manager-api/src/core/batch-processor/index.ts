import { Batch, BatchRequest, GeneratedNumber, GeneratorRequest, MultiplierRequest } from '../../models';
import { utility } from '../../utils';
import { Status } from '../enums/status.enum';
import { generatorManagerService, multiplierManagerService } from "../../services";
import { Subscription } from 'rxjs';
import { GeneratedMultilplier } from '../../models/generated-multiplier.model';

const batchQueue: Batch[] = [];
const requestQueue: BatchRequest[] = [];
const gmGetIntervals: NodeJS.Timeout[] = [];
const mmGetIntervals: NodeJS.Timeout[] = [];
const subscriptions: Subscription[] = [];

function schedulePooling() {
    gmGetIntervals.push(setInterval(() => {
        // HTTP CALL TO GENERATOR MANAGER, SET GENERATED NUMBER.
        subscriptions.push(generatorManagerService.getAll().subscribe((gmResponse: any) => {
            const generatedNumbers = [...(JSON.parse(gmResponse))];
            if (generatedNumbers.length > 0) {
                // console.log('<<generatedNumbers=>', generatedNumbers);
                generatedNumbers.forEach(item => {
                    const batchItem = batchQueue.find(i => i.id === item.batchId);
                    const requestItem = requestQueue.find(rq => rq.id === batchItem.requestId);
                    if (batchItem &&
                        batchItem.generatedMultipliers.length < requestItem.numbersPerBatch &&
                        batchItem.generatedMultipliers.filter(i => i.batchId === item.batchId && i.number === item.number && !i.multiplierNumber).length <= 0) {
                        const tmp1 = batchItem.generatedMultipliers.filter(i => i.batchId === item.batchId &&
                            i.number !== item.number);
                        if (batchItem.generatedMultipliers.length < requestItem.numbersPerBatch
                        ) {
                            batchItem.status = Status.InProcess;
                            batchItem.generatedMultipliers.push({
                                batchId: item.batchId,
                                number: item.number
                            } as GeneratedMultilplier);

                            sendRequestToMultiplier({
                                batchId: item.batchId,
                                number: item.number
                            } as MultiplierRequest);
                        }
                    }
                    //  else {
                    //     console.log('Orphan GM Response ', generatedNumbers);
                    // }
                });
            }
        }));
    }, 2000));

    mmGetIntervals.push(setInterval(() => {
        // HTTP CALL TO MULTIPLIER MANAGER, SET MULTIPLIER NUMBER.
        subscriptions.push(multiplierManagerService.getAll().subscribe((mmResponse: any) => {
            const generatedMultilpliers = (JSON.parse(mmResponse)) as GeneratedMultilplier[];
            if (generatedMultilpliers.length > 0) {
                generatedMultilpliers.forEach(item => {
                    const batchItem = batchQueue.find(i => i.id === item.batchId);
                    if (batchItem) {
                        const multiplierItem = batchItem.generatedMultipliers.find(i => i.batchId === item.batchId && i.number === item.number && !i.multiplierNumber);
                        if (multiplierItem) {
                            multiplierItem.multiplierNumber = item.multiplierNumber;
                        }
                        const requestItem = requestQueue.find(rq => rq.id === batchItem.requestId);
                        //All the numbers processed for the batch. 
                        if (batchItem.generatedMultipliers.filter(i => i.number && i.multiplierNumber).length >= requestItem.numbersPerBatch) {
                            batchItem.status = Status.Received;
                        }
                        //   console.log('batchItem=>', batchItem);
                    } else {
                        console.log(`${item.batchId} Batch Id missing in batchQueue for MM Response => `, generatedMultilpliers);
                    }
                });
            }
            // Update Request Status and Cleanup after processing.
            requestQueue.forEach((requestItem) => {
                const completedBatch = batchQueue.filter(i => requestItem.id === i.requestId && i.status === Status.Received);
                if (completedBatch.length >= requestItem.batchSize) {
                    requestItem.status = Status.Received;
                }
            });
            if (requestQueue.filter(i => i.status === Status.Received).length === requestQueue.length) {
                stopAndDoCleanup(); // clear polling & subscription, when all the batch processed.     
            }
        }));
    }, 2000));
}

function createNewBatch() {
    requestQueue.filter(i => i.status === Status.Pending).forEach(request => {
        request.status = Status.InProcess;
        for (let index = 0; index < request.batchSize; index++) {
            const batchId = utility.getBatchId(batchQueue.map(i => i.id));
            batchQueue.push({
                requestId: request.id,
                id: batchId,
                generatedMultipliers: [] as unknown as GeneratedMultilplier,
                status: Status.Pending
            } as unknown as Batch);
            sendRequestToGenerator({
                batchId: batchId,
                numbersPerBatch: request.numbersPerBatch
            } as GeneratorRequest);
        }
    });
}

function sendRequestToGenerator(request: GeneratorRequest) {
    // console.log('GeneratorRequest=>',request);
    subscriptions.push(generatorManagerService.create(request).subscribe((response) => {
        console.log('Generator Manager Create Response.', response);
    }));
}

function sendRequestToMultiplier(request: MultiplierRequest) {
    subscriptions.push(multiplierManagerService.create(request).subscribe((response) => {
        //   console.log('Multiplier Manager Create Response.', response);
    }));
}

function create(batchSize: number, numbersPerBatch: number) {
    if (requestQueue.length <= 0) {
        requestQueue.push({
            id: utility.getBatchId(requestQueue.map((i) => i.id)),
            batchSize,
            numbersPerBatch,
            status: Status.Pending
        } as BatchRequest);

    } else {
        throw new Error("Can't start a new batch, a batch is already running.");
    }
    createNewBatch();
    schedulePooling();
}

function getAll() {
    return batchQueue;
}

function stopAndDoCleanup() {
    const receivedBatches = batchQueue.filter((i) => i.status !== Status.Received);
    if (receivedBatches.length <= 0) {
        setTimeout(() => {
            clearAll(true);
            console.log('Polling stopped, will start again for a new request...');
        }, 0);
    }
}

function clearAll(retainBatches?: boolean) {
    subscriptions.push(multiplierManagerService.clearAll().subscribe((response) => {
        subscriptions.push(generatorManagerService.clearAll().subscribe((response) => {
            subscriptions.forEach((s) => s.unsubscribe());
            gmGetIntervals.forEach((g) => clearInterval(g));
            mmGetIntervals.forEach((m) => clearInterval(m));
            if (!retainBatches) {
                requestQueue.length = 0;
                batchQueue.length = 0;
            }
        }));
    }));
}

export const batchProcessor = {
    create,
    getAll,
    clearAll
};