
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrdersActions from './orders.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(() =>
        this.ordersService.getOrders().pipe(
          map((response) =>
            OrdersActions.loadOrdersSuccess({ orders: response.data })
          ),
          catchError((error) =>
            of(OrdersActions.loadOrdersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ newOrder }) =>
        this.ordersService.createOrder(newOrder).pipe(
          map((response) => OrdersActions.createOrderSuccess({ order: response.data, message: response.message })),
          tap((response) => {
            if (response.message) this.toastr.success(response.message);
            sessionStorage.removeItem('newOrderForm');
            this.router.navigate(['/dashboard/orders/', response.order.id]);
          }),
          catchError((error) =>
            of(OrdersActions.createOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
