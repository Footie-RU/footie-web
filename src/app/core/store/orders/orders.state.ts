import { Order, Orders } from "../../interfaces/order.interface";


export interface OrdersState {
  orders: Orders;
  selectedOrder?: Order;
  loading: boolean;
  error?: string;
  message?: string;
}

export const initialOrdersState: OrdersState = {
  orders: [],
  selectedOrder: undefined,
  loading: false,
  error: undefined,
  message: undefined,
};
