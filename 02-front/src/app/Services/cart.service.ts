import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../Models/cart.model';

@Injectable()
export class CartService {

constructor(private http: HttpClient) { }

findCart(id: string): Observable<[]> {
    return this.http.get<Cart>('http://localhost:3000/api/carts/findCartByUserID/' +id).pipe(
        map((res: any) => {
            return res['data']
        })
    )
}

createCart(customerID: string) {
    return this.http.post<Cart>('http://localhost:3000/api/carts/createNewCart',{customerID:customerID})
}

deleteCart(cartID: string) {
    return this.http.delete<Cart>('http://localhost:3000/api/carts/deleteCart/' +cartID)
}

updateCart(cartID: string) {
    const cartStatus = true
    return this.http.patch<Cart>('http://localhost:3000/api/carts/updateCart/' +cartID,{cartResolved: cartStatus})
}

}