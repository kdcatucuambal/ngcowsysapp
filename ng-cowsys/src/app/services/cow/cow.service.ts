import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cow } from 'src/app/models/cow.interface';
import { URLAPI } from '../api/url.apis';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  constructor(private _http: HttpClient) {
  }

  getCows(): Observable<Cow[]> {
    return this._http.get<Cow[]>(`${URLAPI.COW_API}/users/cows`);
  }

  getCowsForLazyLoading(take: number, skip: number): Observable<Cow[]> {
    return this._http.get<Cow[]>(`${URLAPI.COW_API}/users/cows/lazload/${take}/${skip}`);
  }

  getCowById(id: number): Observable<Cow> {
    return this._http.get<Cow>(`${URLAPI.COW_API}/users/cows/${id}`);
  }

  getMatchingCowsByValue(value: string): Observable<Cow[]> {
    return this._http.get<Cow[]>(`${URLAPI.COW_API}/users/cows/value-match/${value}`);
  }

  newCow(cow: Cow): Observable<any> {
    return this._http.post<any>(`${URLAPI.COW_API}/users/cows/`, cow);
  }

  updateCow(cow: Cow): Observable<any> {
    return this._http.put<any>(`${URLAPI.COW_API}/users/cows/${cow.cowId}`, cow);
  }

  updateActive(active: boolean, id: number): Observable<any> {
    return this._http.patch(`${URLAPI.COW_API}/users/cows/${id}`, { active });
  }

  deleteCow(id: number): Observable<any>{
    return this._http.delete(`${URLAPI.COW_API}/users/cows/${id}`);
  }



  getCount(): Observable<number> {
    return this._http.get<any>(`${URLAPI.COW_API}/users/cows/count/total`).pipe(
      map(res => res.total)
    );
  }

}
