import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../interfaces/user.interface';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LoginResponse, RequestResponse } from '../interfaces/index.interface';
import { ApiEndpoints } from '../configs/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loginByEmail(payload: {
    email: string;
    password: string;
    role: UserRole;
  }): Observable<RequestResponse> {
    return this.httpClient
      .post<LoginResponse>(ApiEndpoints.auth.login.viaEmail(), payload)
      .pipe(
        tap((response) => {
          if (response.result === 'success') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem(
              'userSessionData',
              JSON.stringify(response.data)
            );
          }
        }),
        switchMap((response) =>
          response.result === 'success'
            ? of(response.data)
            : throwError(response)
        ),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  loginByPhone(payload: {
    phone: string;
    password: string;
    role: UserRole;
  }): Observable<RequestResponse> {
    return this.httpClient
      .post<LoginResponse>(ApiEndpoints.auth.login.viaPhone(), payload)
      .pipe(
        tap((response) => {
          if (response.result === 'success') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem(
              'userSessionData',
              JSON.stringify(response.data)
            );
          }
        }),
        switchMap((response) =>
          response.result === 'success'
            ? of(response.data)
            : throwError(response)
        ),
        catchError((error) => throwError(error))
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  checkIfLoggedIn(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.httpClient
      .get<RequestResponse>(ApiEndpoints.auth.login.isAuthenticated(), {
        headers,
      })
      .pipe(
        tap((response) => {
          if (response.result === 'success')
            localStorage.setItem(
              'userSessionData',
              JSON.stringify(response.data)
            );
        }),
        switchMap((response) =>
          response.result === 'success' ? of(true) : of(false)
        ),
        catchError((error) => of(false))
      );
  }

  logout() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.httpClient
      .get<RequestResponse>(ApiEndpoints.auth.login.logout(), { headers })
      .pipe(
        tap((response) => {
          if (response.result === 'success') {
            localStorage.removeItem('user');
            localStorage.removeItem('userSessionData');
            localStorage.removeItem('token');
          }
        }),
        switchMap((response) =>
          response.result === 'success'
            ? of(true)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error))
      );
  }
}
