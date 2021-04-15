import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials, UserRegister, UserResponse } from '../../models/user.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URLAPI } from "../api/url.apis";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loggedIn = new BehaviorSubject<boolean>(false);
  private userToken = new BehaviorSubject<string>("");
  private userName: string = '';

  constructor(
    private _http: HttpClient,
    private _router: Router) {
    this.checkToken();
    console.log('AuthService initialize!!');

  }

  login(authData: UserCredentials): Observable<UserResponse> {
    return this._http.post<UserResponse>(`${URLAPI.COW_API}/auth/login`, authData)
      .pipe(
        map(user => {
          this.saveLocalStorage(user);
          this.loggedIn.next(true);
          this.userToken.next(user.token);
          this.userName = user.email;
          return user;
        }),
        catchError(err => {
          return throwError("CatchError: " + err);
        })
      )
  }

  create(user: UserRegister): Observable<any> {
    const parseUser = {
      email: user.email,
      password: user.password,
      name: user.name + ' ' + user.lastname
    }

    return this._http.post(`${URLAPI.COW_API}/users`, parseUser);

  }


  public logout(): void {
    localStorage.removeItem('user-cowsys');
    this.loggedIn.next(false);
    this.userToken.next('');
    this._router.navigate(['/']);
  }

  private saveLocalStorage(user: UserResponse): void {
    const { id, message, ...rest } = user;
    localStorage.setItem('user-cowsys', JSON.stringify(rest));

  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user-cowsys'));
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.userToken.next(user.token);
        this.userName = user.email;
      }
    }
    if (user == null) {
      this.loggedIn.next(false);
      this.userToken.next('');
      this.userName = "";
    }
  }

  get isLoggedIn(): Observable<boolean> {
    this.checkToken();
    return this.loggedIn.asObservable();
  }

  get userTokenValue(): string {
    return this.userToken.getValue();
  }

  public get userNameValue(): string {
    return this.userName;
  }


}
