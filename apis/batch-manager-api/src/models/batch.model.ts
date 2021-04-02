import { Status } from "../core/enums/status.enum";
import { GeneratedMultilplier } from "./generated-multiplier.model";

export interface Batch {
    requestId: number,
    id: number;
    generatedMultipliers: GeneratedMultilplier[];
    status: Status
}
