export type PaymentMethod = 'invoice' | 'creditcard';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  items: CartItem[];
  currency: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AddressDetails {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export interface CreditCardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

export interface OrderPayload {
  personal: PersonalDetails;
  address: AddressDetails;
  paymentMethod: PaymentMethod;
  creditCard?: CreditCardDetails | null;
  cart: Cart;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface OrderSuccessResponse {
  success: true;
  orderId: string;
}

export interface OrderErrorResponse {
  success: false;
  errors: ValidationError[];
}

export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;
