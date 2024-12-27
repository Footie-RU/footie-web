import { Injectable } from '@angular/core';
import { Observable, switchMap, of, throwError, catchError } from 'rxjs';
import { ApiEndpoints } from '../configs/api.config';
import { RequestResponse } from '../interfaces/index.interface';
import { Orders, Order } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all orders
   */
  getOrders(): Observable<RequestResponse> {
    return this.httpClient
      .get<RequestResponse>(ApiEndpoints.orders.getAll())
      .pipe(
        switchMap((response) =>
          response.result === 'success'
            ? of(response)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error.error))
      );
  }

  /**
   * Fetch a single order by ID
   */
  getOrder(id: string): Observable<RequestResponse> {
    return this.httpClient
      .get<RequestResponse>(ApiEndpoints.orders.getById(id))
      .pipe(
        switchMap((response) =>
          response.result === 'success'
            ? of(response)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error.error))
      );
  }

  /**
   * Create a new order
   */
  createOrder(newOrder: Partial<Order>): Observable<RequestResponse> {
    return this.httpClient
      .post<RequestResponse>(ApiEndpoints.orders.create(), newOrder)
      .pipe(
        switchMap((response) =>
          response.result === 'success'
            ? of(response)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error.error))
      );
  }

  /**
   * Update an existing order
   */
  updateOrder(
    id: string,
    updatedOrder: Partial<Order>
  ): Observable<RequestResponse> {
    return this.httpClient
      .patch<RequestResponse>(ApiEndpoints.orders.update(id), updatedOrder)
      .pipe(
        switchMap((response) =>
          response.result === 'success'
            ? of(response)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error.error))
      );
  }

  /**
   * Delete an order
   */
  deleteOrder(id: string): Observable<RequestResponse> {
    return this.httpClient
      .delete<RequestResponse>(ApiEndpoints.orders.delete(id))
      .pipe(
        switchMap((response) =>
          response.result === 'success'
            ? of(response)
            : throwError(response.message)
        ),
        catchError((error) => throwError(error.error))
      );
  }
}
