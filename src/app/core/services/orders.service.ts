import { Injectable } from '@angular/core';
import { Observable, switchMap, of, throwError, catchError, from } from 'rxjs';
import { ApiEndpoints } from '../configs/api.config';
import { RequestResponse } from '../interfaces/index.interface';
import { Orders, Order } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { base64ToBlob, fetchBlobFromUrl } from 'src/app/utils/orders/helpers';

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
    // First, create the order
    return this.httpClient
      .post<RequestResponse>(ApiEndpoints.orders.create(), newOrder)
      .pipe(
        switchMap((response) => {
          // Check if order creation was successful
          if (response.result === 'success') {
            const imageString: string = newOrder.details?.package
              .image as string;

            // Convert image string to Blob
            const blobPromise = imageString.startsWith('data:')
              ? Promise.resolve(base64ToBlob(imageString))
              : fetchBlobFromUrl(imageString);

            // If order creation is successful, upload the image
            return from(blobPromise).pipe(
              switchMap((blob) =>
                this.uploadImage(blob, response.data.id).pipe(
                  // After image upload, return the result
                  switchMap((uploadResponse) => {
                    // Combine the results or return the upload result
                    return of({
                      result: response.result,
                      message: 'Order created and image uploaded successfully',
                      data: response.data,
                    });
                  })
                )
              )
            );
          } else {
            // If order creation failed, throw an error
            return throwError(response.message);
          }
        }),
        catchError((error) => throwError(error.error)) // Handle errors
      );
  }

  /**
   * Upload an image for an order
   */
  private uploadImage(
    file: Blob,
    orderId: string
  ): Observable<RequestResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient
      .post<RequestResponse>(ApiEndpoints.orders.uploadImage(orderId), formData)
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
