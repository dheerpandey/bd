import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'enums/status.enum';
import { BatchService } from 'services/batch.service';
import { BatchRequest } from '../models/batch-request-model';
import { BatchSummary } from '../models/batch-summary';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  batchRequestForm: FormGroup;
  message: string;
  isDisableBatchStart: boolean;
  overallStatus: Status;
  statusEnum = Status;
  constructor(private fb: FormBuilder, public batchService: BatchService) {
    this.isDisableBatchStart = false;
    this.batchRequestForm = fb.group({
      batchSize: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      numbersPerBatch: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  newBatchRequest() {
    const batchRequest = {
      batchSize: this.batchRequestForm.controls.batchSize.value,
      numbersPerBatch: this.batchRequestForm.controls.numbersPerBatch.value
    } as BatchRequest;

    this.batchService.Add(batchRequest).subscribe(() => {
      this.message = "Batch created successfully!!";
    });

  }
  clearBatch() {
    this.batchService.Delete().subscribe(() => {
      this.message = "All data for current batch have been cleared!!";
    });

  }
  updateBatch(batchSummary: BatchSummary) {
    this.overallStatus = batchSummary.grandTotal.overallStatus;
    this.isDisableBatchStart =  this.batchRequestForm.invalid ||
                                batchSummary.grandTotal.overallStatus === Status.Pending ||
                                batchSummary.grandTotal.overallStatus === Status.InProcess;
  }

  ngOnInit() {
  }

}
