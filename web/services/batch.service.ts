import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BatchRequest } from 'src/app/models/batch-request-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  httpOptions: any;
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8080/api/batch/';
  }

  Add(batchRequest: BatchRequest): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.baseURL}` + 'create', JSON.stringify(batchRequest), this.httpOptions);

  }

  GetAll(): Observable<any> {
    return this.http.get(`${this.baseURL}` + 'get-all');
  }

  Delete() {
    return this.http.delete(`${this.baseURL}` + 'clear-all');
  }
}
