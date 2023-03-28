import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../Models/delivery.model';

@Injectable()
export class DeliveryService {

constructor(private http: HttpClient) { }

createDelivery(deliveryData: any,price: number,customerIDRegistered: string,cartToResolve: string) {
    const delivery = {
        customerID: customerIDRegistered,
        cartID: cartToResolve,
        totalPrice: price,
        deliveryCity: deliveryData.city,
        deliveryStreet: deliveryData.street,
        deliveryDate: deliveryData.date,
        last4DigitsOfCreditCard: deliveryData.last4DigitsOfCreditCard
    }
    return this.http.post<Delivery>('http://localhost:3000/api/deliveries/createNewDelivery',delivery)
}
}