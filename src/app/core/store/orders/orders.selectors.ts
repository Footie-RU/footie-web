
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.state';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state) => state.orders || []
);

export const selectOrderById = (orderId: string) =>
  createSelector(selectOrdersState, (state) =>
    state.orders.find((order) => order.id === orderId)
  );

export const selectOrdersLoadingState = createSelector(
  selectOrdersState,
  (state) => state.loading
);

export const selectOrdersErrorState = createSelector(
  selectOrdersState,
  (state) => state.error
);

export const selectCreateOrderSuccessState = createSelector(
  selectOrdersState,
  (state) => state.message
);
