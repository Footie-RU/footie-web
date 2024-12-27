import type { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Orders } from '../interfaces/order.interface';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, of, switchMap, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { loadOrders } from '../store/orders/orders.actions';
import { selectOrdersLoadingState, selectAllOrders } from '../store/orders/orders.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<void> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.store.dispatch(loadOrders());

    // Wait until the loading state becomes false (i.e., data has loaded)
    return this.store.pipe(
      select(selectOrdersLoadingState),
      filter((loading) => !loading), // Wait until loading is false
      take(1), // Complete the observable after loading is false
      switchMap(() => this.store.pipe(select(selectAllOrders))), // Return the loaded orders
      catchError((error) => {
        // Handle error if needed (e.g., redirect or show an error message)
        console.error(error);
        return of(null); // Return null in case of error or handle as needed
      })
    );
  }
}
