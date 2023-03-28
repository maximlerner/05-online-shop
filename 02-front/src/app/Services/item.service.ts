import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../Models/item.model';

@Injectable()
export class ItemService {

constructor(private http: HttpClient) { }

    findItems(id: string): Observable<[]> {
        return this.http.get<Item>('http://localhost:3000/api/cartItems/findCartItemByCartID/' +id).pipe(
            map((res: any) => {
                console.log(res);
                return res['data']
            })
        )
    }

    createItem(productID: string,cartID: string,pricePerItem: number) {
        const data = {
            productID: productID,
            cartID: cartID,
            pricePerItem: pricePerItem,
            quantity: 1
        }
        return this.http.post<Item>('http://localhost:3000/api/cartItems/createNewCartItem',data )
    }

    deleteItem(itemID: string) {
        return this.http.delete<Item>('http://localhost:3000/api/cartItems/deleteCartItem/' + itemID)
    }
    
    deleteItemsByCart(cartID: string){
        console.log(cartID);
        return this.http.delete<Item>('http://localhost:3000/api/cartItems/deleteCartItemsByDeletedCart/' + cartID)
    }

}