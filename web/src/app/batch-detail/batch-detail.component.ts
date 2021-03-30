import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Status } from 'enums/status.enum';
import { Subscription } from 'rxjs';
import { BatchService } from 'services/batch.service';
import { BatchSummary } from '../models/batch-summary';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit, OnDestroy {
  batchSummary: BatchSummary;
  @Output() batchSummaryEmitter = new EventEmitter<BatchSummary>();
  private readonly subscriptions: Subscription[];

  constructor(protected batchService: BatchService) {
    this.subscriptions = [];
    this.batchSummary = {} as BatchSummary;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    this.loadBatchSummary();
  }

  private loadBatchSummary(): void {

    setInterval(() => {
      this.subscriptions.push(this.batchService.GetAll().subscribe(batches => {
        this.batchSummary.batches = batches.map((item) => {
          const processed = item.generatedNumbers.filter(i => i.multiplierNumber).length;
          return {
            id: item.id,
            status: item.status,
            pending: item.generatedNumbers.length - processed,
            processed,
          }
        });
        this.batchSummary.grandTotal = {} as any;
        this.batchSummary.grandTotal.batchCount = this.batchSummary.batches.length;
        this.batchSummary.grandTotal.totalPending = this.batchSummary.batches.reduce((accumulator, item) => accumulator + item.pending, 0);
        this.batchSummary.grandTotal.totalProcessed = this.batchSummary.batches.reduce((accumulator, item) => accumulator + item.processed, 0);
        if (this.batchSummary.batches.every((item) => item.status === Status.Received)) {
          this.batchSummary.grandTotal.overallStatus = Status.Completed;
        } else if (this.batchSummary.batches.some((item) => item.status === Status.InProcess)) {
          this.batchSummary.grandTotal.overallStatus = Status.InProcess;
        } else {
          this.batchSummary.grandTotal.overallStatus = Status.Pending;
        }
        this.batchSummaryEmitter.emit(this.batchSummary);
      }));
    }, 2000);
  }
}
