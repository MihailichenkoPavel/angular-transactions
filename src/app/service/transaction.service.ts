import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Transaction } from '../model/transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private url = 'https://localhost:44303/api/transactions';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/all')
      .pipe(map(response=>response.sort((a, b)=> a.transactionId - b.transactionId)),
        tap(x=>console.log(x))
      );
  }

  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.url}/get/${id}`;
    return this.http.get<Transaction>(url);
  }

  updateTransaction (transaction: Transaction): Observable<any> {
    return this.http.put(this.url + '/update/', transaction, this.httpOptions);
  }

  deleteTransaction (transaction: Transaction | number): Observable<Transaction> {
    const id = typeof transaction === 'number' ? transaction : transaction.id;
    const url = this.url + '/delete/' + id;

    return this.http.delete<Transaction>(url, this.httpOptions);
  }

  filteringTransactions (status: string, type: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url+'/filtered/'+ '?status=' + status +'&type='+ type)
    .pipe(map(response=>response.sort((a, b)=> a.transactionId - b.transactionId)),
    tap(x=>console.log(x))
  );
  }

  ImportCsv(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.url + '/importcsv', formData, httpOptions)
  }
}