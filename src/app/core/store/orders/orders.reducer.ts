
import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { OrdersState, initialOrdersState } from './orders.state';
import { OrderStatus } from '../../interfaces/order.interface';

export const ordersReducer = createReducer(
  initialOrdersState,
  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrdersActions.selectOrder, (state, { order }) => ({
    ...state,
    selectedOrder: order,
  })),
  on(OrdersActions.updateOrderStatus, (state, { orderId, status }) => ({
    ...state,
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status: status as OrderStatus } : order
    ),
  })),
  on(OrdersActions.createOrder, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    loading: false,
  })),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
