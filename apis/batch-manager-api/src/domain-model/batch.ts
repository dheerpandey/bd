import { Status } from "../core/enums/status.enum";
import { GeneratedNumber } from "./generated-number";

export interface Batch {
    requestId: number,
    id: number;
    generatedNumbers: GeneratedNumber[];
    status: Status
}
