import { Status } from "../core/enums/status.enum";

export interface GeneratedNumber {
    requestId: number,
    batchId: number,
    number: number;
    multiplierNumber: number;
}