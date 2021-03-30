import { Status } from "enums/status.enum";

export interface BatchSummary {
  batches: [{
    batchId: number;
    pending: number,
    processed: number,
    status: Status
  }],
  grandTotal: {
    batchCount: number,
    totalPending: number,
    totalProcessed: number,
    overallStatus: Status
  }
}
