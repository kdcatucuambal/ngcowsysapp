import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TempRecord } from 'src/app/models/record.interace';
import { URLAPI } from '../api/url.apis';

@Injectable({
  providedIn: 'root'
})
export class RecordsTempService {

  constructor(private _http: HttpClient) { }

  getRecords(): Observable<TempRecord[]> {
    return this._http.get<TempRecord[]>(`${URLAPI.COW_API}/users/temp-records`)
      .pipe(
        map(recs => {
          return recs.map(r => {
            r.tempRecordAfternoon = parseInt(r.tempRecordAfternoon.toString());
            r.tempRecordMorning = parseInt(r.tempRecordMorning.toString())
            return r;
          });
        })
      );
  }

  getRecordsByDates(from: string, to: string): Observable<TempRecord[]> {
    return this._http.get<TempRecord[]>(`${URLAPI.COW_API}/users/temp-records/bydates/${from}/${to}`).pipe(
      map(recs => {
        return recs.map(r => {
          r.tempRecordAfternoon = parseInt(r.tempRecordAfternoon.toString());
          r.tempRecordMorning = parseInt(r.tempRecordMorning.toString())
          return r;
        });
      })
    );;
  }

  getRecordsForChart(): Observable<TempRecord[]> {
    return this._http.get<TempRecord[]>(`${URLAPI.COW_API}/users/temp-records/chart/limit`)
      .pipe(
        map(recs => {
          return recs.map(r => {
            r.tempRecordAfternoon = parseInt(r.tempRecordAfternoon.toString());
            r.tempRecordMorning = parseInt(r.tempRecordMorning.toString())
            return r;
          });
        })
      );
  }

  newRecord(record: TempRecord): Observable<any> {
    return this._http.post<any>(`${URLAPI.COW_API}/users/temp-records`, record);
  }

  updateRecord(record: TempRecord): Observable<any> {
    return this._http.put<any>(`${URLAPI.COW_API}/users/temp-records/${record.tempRecordId}`, record);
  }

  deleteRecord(id: number): Observable<any> {
    return this._http.delete<any>(`${URLAPI.COW_API}/users/temp-records/${id}`);
  }


}
