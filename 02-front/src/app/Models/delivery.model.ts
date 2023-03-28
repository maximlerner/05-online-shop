export interface Delivery {
    customerID: string,
    cartID: string,
    totalPrice: number,
    deliveryCity: string,
    deliveryStreet: string,
    deliveryDate: Date,
    last4DigitsOfCreditCard: string,
    // deliveryID: string,
}