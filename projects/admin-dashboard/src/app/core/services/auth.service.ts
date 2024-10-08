import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../interfaces/user.interface';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { RequestResponse } from '../interfaces/index.interface';
import { ApiEndpoints } from '../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  loginByEmail(payload: { email: string, password: string, role: UserRole }): Observable<any> {
    return this.httpClient.post<RequestResponse>(ApiEndpoints.auth.login.viaEmail(), payload).pipe(
      tap(response => {
        if (response.result === "success") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userSessionData", JSON.stringify(response.data));
        }
      }),
      switchMap(response => response.result === "success" ? of(response.data) : throwError(response.message)),
      catchError(error => throwError(error.error)),
    );
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!localStorage.getItem("token"));
  }

  checkIfLoggedIn(): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.httpClient.get<RequestResponse>(ApiEndpoints.auth.login.isAuthenticated(), { headers }).pipe(
      tap(response => {
        this.handleIsAuthenticatedResponse(response);
        if (response.result === "success") localStorage.setItem("userSessionData", JSON.stringify(response.data));
        }),
      switchMap(response => response.result === "success" ? of(true) : of(false)),
      catchError(error => {
        this.handleIsAuthenticatedResponse(error.error);
        return of(false);
      }),
    );
  }

  private handleIsAuthenticatedResponse(response: RequestResponse) {
    if (response.result === "error") {
      if (response.message === 'Invalid token') {
        localStorage.removeItem('token');
        localStorage.removeItem('userSessionData');
        localStorage.removeItem('user');
      }
    }
  }

  logout() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.httpClient.get<RequestResponse>(ApiEndpoints.auth.login.logout(), { headers }).pipe(
      tap((response) => {
        if (response.result === 'success') {
          localStorage.removeItem('user');
          localStorage.removeItem('userSessionData');
          localStorage.removeItem('token');
        }
      }),
      switchMap(response => response.result === "success" ? of(true) : throwError(response.message)),
      catchError(error => throwError(error)),
    );
  }
}
