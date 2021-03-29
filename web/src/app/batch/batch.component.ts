import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchService } from 'services/batch.service';
import { BatchRequest } from '../models/batch-request-model';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  batchRequestForm: FormGroup;
  message: string;
  constructor(private fb: FormBuilder, public batchService: BatchService) {
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

  ngOnInit() {
  }

}
