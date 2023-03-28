import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
    constructor(private http: HttpClient) { }

    public getOrders(): Observable<[]> {
        return this.http.get('http://localhost:3000/api/deliveries/getAllDeliveries').pipe(
            map((res: any) => {
                return res['data']
            })
        )
    };
}