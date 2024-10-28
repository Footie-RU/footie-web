import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpToastInterceptor implements HttpInterceptor {
  // URLs to exclude from toast notifications
  private urlsToIgnore = [
    '/auth',
    '/users',
    '/kyc/list',
  ];

  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldIgnore = this.urlsToIgnore.some((url) => req.url.includes(url));

    return next.handle(req).pipe(
      tap((event) => {
        if (!shouldIgnore && event instanceof HttpResponse && event.body?.message) {
          // If there's a success message from the API, show it
          this.toastr.success(event.body.message);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        if (!shouldIgnore) {
          const errorMessage =
            error.error?.message || 'An error occurred. Please try again.';
          this.toastr.error(errorMessage);
        }
        return throwError(error); // Rethrow the error for further handling
      })
    );
  }
}
