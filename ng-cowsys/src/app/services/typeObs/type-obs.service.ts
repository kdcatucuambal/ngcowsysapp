import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { typeObs } from 'src/app/models/observation.interface';
import { URLAPI } from '../api/url.apis';

@Injectable({
  providedIn: 'root'
})
export class TypeObsService {

  constructor(private _http: HttpClient) { }

  getTypesObservations(): Observable<typeObs[]> {
    return this._http.get<typeObs[]>(`${URLAPI.COW_API}/users/types`);
  }
}
