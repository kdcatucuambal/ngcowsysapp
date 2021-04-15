import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payment } from 'src/app/models/payment.interface';
import { URLAPI } from '../api/url.apis';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {




  constructor(private _http: HttpClient) {

  }

  getPayments(): Observable<Payment[]> {
    return this._http.get<Payment[]>(`${URLAPI.COW_API}/users/payments`).pipe(
      map(pays => {
        const paysMap = pays.map(p => {
          p.paymentTotalLiters = parseInt(p.paymentTotalLiters.toString());
          return p;
        })
        return paysMap;
      })
    );
  }

  getPaymentsForChart(): Observable<Payment[]> {
    return this._http.get<Payment[]>(`${URLAPI.COW_API}/users/payments/chart/limit`).pipe(
      map(pays => {
        const paysMap = pays.map(p => {
          p.paymentTotalLiters = parseInt(p.paymentTotalLiters.toString());
          return p;
        })
        return paysMap;
      })
    );
  }

  getPaymentById(id: number): Observable<Payment> {
    return this._http.get<Payment>(`${URLAPI.COW_API}/users/payments/${id}`).pipe(
      map(pay => {
        pay.records = pay.records.map(rec => {
          rec.recordAfternoon = parseInt(rec.recordAfternoon.toString());
          rec.recordMorning = parseInt(rec.recordMorning.toString());
          return rec;
        })
        return pay;
      })
    );
  }

  newPayment(payment: Payment): Observable<any> {
    return this._http.post<any>(`${URLAPI.COW_API}/users/payments`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this._http.delete<any>(`${URLAPI.COW_API}/users/payments/${id}`);
  }

}
