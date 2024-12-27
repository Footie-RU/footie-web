
import { createAction, props } from '@ngrx/store';
import { Order, Orders } from '../../interfaces/order.interface';

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Orders }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

export const selectOrder = createAction(
  '[Orders] Select Order',
  props<{ order: Order }>()
);
export const updateOrderStatus = createAction(
  '[Orders] Update Order Status',
  props<{ orderId: string; status: string }>()
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ newOrder: Partial<Order> }>()
);
export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order, message: string }>()
);
export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);
