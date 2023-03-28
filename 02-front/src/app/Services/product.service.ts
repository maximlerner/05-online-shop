import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product.model';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    public getProducts(): Observable<[]> {
        return this.http.get('http://localhost:3000/api/products/getAllProducts').pipe(
            map((res: any) => {
                return res['data']
            })
        )
    };

    public getProduct(id: string) {
        return this.http.get<Product>('http://localhost:3000/api/products/getProduct/' +id,).pipe(
            map((res: any) => {
                return res['data']
            })
        )
    }
      
    public addProduct(product: any){
        return this.http.post<Product>('http://localhost:3000/api/products/createNewProduct',product)
    }

    public updateProduct(id: string, product: any) {
        return this.http.patch<Product>('http://localhost:3000/api/products/updateProduct/' +id, product)
    }

    public deleteProduct(id: string) {
        return this.http.delete<Product>('http://localhost:3000/api/products/deleteProduct/' +id)
    }
}