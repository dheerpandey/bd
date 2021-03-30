import { Status } from '../core/enums/status.enum';
import { BatchRequest } from '../domain-model/batch-request';
import { NotFoundError } from '../middleware';
import { utility } from '../utils';
const batchRequestQueue: BatchRequest[] = [];

function add(batchRequest: BatchRequest) {
    batchRequest.id = utility.getBatchId(batchRequestQueue.map(i => i.id));
    batchRequest.status = Status.Pending;
    batchRequestQueue.push(batchRequest);
    return Promise.resolve(batchRequest);
}

function update(batchRequest: BatchRequest) {
    const index = batchRequestQueue.findIndex(i => batchRequest.id === i.id);
    if (index > -1) {
        batchRequestQueue[index].status = batchRequest.status;
        Promise.resolve(batchRequestQueue[index]);
    } else {
        Promise.reject(new NotFoundError("Batch Request Does Not Exists."));
    }
}

function remove(batchRequest: BatchRequest) {
    const index = batchRequestQueue.findIndex(i => batchRequest.id === i.id);
    if (index > -1) {
        Promise.resolve(batchRequestQueue.splice(index, 1));
    } else {
        Promise.reject(new NotFoundError("Batch Request Does Not Exists."));
    }
}

function getAll() {
    return Promise.resolve(batchRequestQueue);
}

export const batchRequestRepository = {
    add,
    update,
    remove,
    getAll
};
