import { Status } from '../core/enums/status.enum';
import { Batch } from '../domain-model/batch';
import { NotFoundError } from '../middleware';
import { utility } from '../utils';
const batchQueue: Batch[] = [];

function add(batchRequest: Batch) {
    batchRequest.id = utility.getBatchId(batchQueue.map(i => i.id));
    batchRequest.status = Status.Pending;
    batchQueue.push(batchRequest);
    return Promise.resolve(batchRequest);
}

function update(batchRequest: Batch) {
    const index = batchQueue.findIndex(i => batchRequest.id === i.id);
    if (index > -1) {
        batchQueue[index].status = batchRequest.status;
        Promise.resolve(batchQueue[index]);
    } else {
        Promise.reject(new NotFoundError("Batch Does Not Exists."));
    }
}

function remove(batchRequest: Batch) {
    const index = batchQueue.findIndex(i => batchRequest.id === i.id);
    if (index > -1) {
        Promise.resolve(batchQueue.splice(index, 1));
    } else {
        Promise.reject(new NotFoundError("Batch Does Not Exists."));
    }
}

function getAll() {
    return Promise.resolve(batchQueue);
}

export const batchRepository = {
    add,
    update,
    remove,
    getAll
};
