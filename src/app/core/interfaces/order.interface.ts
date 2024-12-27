import { Courier, User } from './user.interface';

/**
 * Order status
 * @enum {string}
 * @readonly
 * @description The status of an order
 */
export enum OrderStatus {
  Pending = 'Pending', // Order is created but not yet accepted by any courier
  Accepted = 'Accepted', // Order is accepted by a courier
  InProgress = 'InProgress', // Courier is currently delivering the order
  Delivered = 'Delivered', // Order has been successfully delivered
  Cancelled = 'Cancelled', // Order has been cancelled
  Failed = 'Failed', // Order delivery failed
}

export enum ItemType {
  gadget = 'gadget',
  clothing = 'clothing',
  document = 'document',
  food = 'food',
  furniture = 'furniture',
  book = 'book',
  appliance = 'appliance',
  beauty = 'beauty',
  sport = 'sport',
  tool = 'tool',
  electronics = 'electronics',
  jewelry = 'jewelry',
  other = 'other',
}

export interface Address {
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  locationType?: LocationType | string;
  type: 'pickup' | 'delivery';
  coordinates?: number[];
}

export enum LocationType {
  mall = 'mall',
  office = 'office',
  home = 'home',
  airport = 'airport',
  hospital = 'hospital',
  school = 'school',
  restaurant = 'restaurant',
  hotel = 'hotel',
  other = 'other',
}

export interface Order {
  id: string;
  details: {
    package: Package,
    recipient: Recipient,
    sender: Sender,
  }
  location: LocationAddress; // Location location
  payment: OrderPayment; // Payment details
  status: OrderStatus; // Current status of the order
  createdAt: Date | string; // Timestamp when the order was created
  updatedAt: Date | string;
  acceptedAt?: Date | string; // Timestamp when the order was accepted by a courier
  deliveredAt?: Date | string; // Timestamp when the order was delivered
  cancelledAt?: Date | string; // Timestamp when the order was cancelled
  estimatedDeliveryTime?: Date | string; // Estimated time of delivery
  chat?: Chat;
  courier?: Courier;
}

export interface LocationAddress {
  pickup: Address; // Location address
  delivery: Address; // Delivery address
}

export interface Package {
  title: string
  type: string
  quantity: number
  size: string
  image: string
  modeOfDelivery: string
  message: string
}

export interface Recipient {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface Sender {
  name: string;
  phone: string;
  email: string;
  userId: string;
}

export interface OrderPayment {
  price: number;
  currency?: string;
}

export interface Chat {
  id: string;
  orderId: string;
  messages: Message[];
}

export interface Message {
  id: string;
  sender: User | Courier;
  content: string;
  timestamp: Date | string;
}

export type Orders = Order[];
