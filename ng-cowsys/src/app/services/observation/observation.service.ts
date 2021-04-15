import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/models/observation.interface';
import { URLAPI } from '../api/url.apis';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(private _http: HttpClient) { }


  getObservations(): Observable<Observation[]> {
    return this._http.get<Observation[]>(`${URLAPI.COW_API}/users/observations`);
  }

  getObservationsByCow(id: number): Observable<Observation[]> {
    return this._http.get<Observation[]>(`${URLAPI.COW_API}/users/observations/bycow/${id}`);
  }

  getObservationById(id: number): Observable<Observation> {
    return this._http.get<Observation>(`${URLAPI.COW_API}/users/observations/${id}`);
  }

  newObservation(observation: Observation): Observable<any> {
    const obs = {
      type: observation.type.typeId,
      cow: observation.cow.cowId,
      observationDescription: observation.observationDescription,
      observationPrice: observation.observationPrice,
      observationDate: observation.observationDate
    }
    return this._http.post<any>(`${URLAPI.COW_API}/users/observations`, obs);
  }


  updateObservation(observation: Observation): Observable<any> {
    const obs = {
      type: observation.type.typeId,
      observationDescription: observation.observationDescription,
      observationPrice: observation.observationPrice,
      observationDate: observation.observationDate
    }
    return this._http.put<any>(`${URLAPI.COW_API}/users/observations/${observation.observationId}`, obs);
  }


  deleteObservation(id: number): Observable<any> {
    return this._http.delete<any>(`${URLAPI.COW_API}/users/observations/${id}`);
  }


}
