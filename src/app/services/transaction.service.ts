import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../shared/models/Transaction';
import { Observable } from 'rxjs';
import { TRANSACTION_ADD_URL, TRANSACTION_BY_ID_URL, TRANSACTION_BY_USERID_URL, TRANSACTION_REMOVE_URL, TRANSACTION_UPDATE_URL, TRANSACTION_URL } from '../shared/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http:HttpClient,
  ) { }
  addTransaction(TransactionData:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(TRANSACTION_ADD_URL,TransactionData);
  }
  getAll() : Observable<Transaction[]>{
      return this.http.get<Transaction[]>(TRANSACTION_URL);
  }
  getTransactionByUserId(userId :string) : Observable<Transaction[]>{
    return this.http.get<Transaction[]>(TRANSACTION_BY_USERID_URL+ userId);
  }
  getTransactionById(TransactionId :string) : Observable<Transaction>{
    return this.http.get<Transaction>(TRANSACTION_BY_ID_URL+ TransactionId);
  }
  update(updateData : any, TransactionId : string){
    return this.http.put<Transaction>(TRANSACTION_UPDATE_URL + TransactionId, updateData)
  }
  deleteTransaction(TransactionId:string){
    return this.http.delete(TRANSACTION_REMOVE_URL+TransactionId);
  }
}
