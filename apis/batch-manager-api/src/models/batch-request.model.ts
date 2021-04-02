import { Status } from "../core/enums/status.enum";

export interface BatchRequest {
    id: number;
    batchSize: number;
    numbersPerBatch: number;
    status: Status;
}
