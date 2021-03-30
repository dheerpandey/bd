import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'enums/status.enum';
import { Subscription } from 'rxjs/internal/Subscription';
import { BatchService } from 'services/batch.service';
import { BatchRequest } from '../models/batch-request-model';
import { BatchSummary } from '../models/batch-summary';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit, OnDestroy {
  batchRequestForm: FormGroup;
  message: string;
  isDisableBatchStart: boolean;
  overallStatus: Status;
  statusEnum = Status;
  isError: boolean;
  private readonly subscriptions: Subscription[];
  constructor(private fb: FormBuilder, public batchService: BatchService) {
    this.isDisableBatchStart = false;
    this.subscriptions = [];
    this.batchRequestForm = fb.group({
      batchSize: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      numbersPerBatch: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  newBatchRequest() {
    const batchRequest = {
      batchSize: this.batchRequestForm.controls.batchSize.value,
      numbersPerBatch: this.batchRequestForm.controls.numbersPerBatch.value
    } as BatchRequest;

    this.subscriptions.push(this.batchService.Add(batchRequest).subscribe((response) => {
      this.message = response.message;
    },
      (response: any) => {
        this.message = response.error ? response.error.message : response.message;
        this.isError = true;
      }));
  }

  clearBatch() {
    this.subscriptions.push(this.batchService.Delete().subscribe((response: any) => {
      this.message = response.message;
    },
      (response: any) => {
        this.message = response.error ? response.error.message : response.message;
        this.isError = true;
      }
    ));

  }
  updateBatch(batchSummary: BatchSummary) {
    this.overallStatus = batchSummary.grandTotal.overallStatus;
    this.isDisableBatchStart = this.batchRequestForm.invalid ||
      batchSummary.grandTotal.overallStatus === Status.Pending ||
      batchSummary.grandTotal.overallStatus === Status.InProcess;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
  }

}
