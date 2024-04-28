import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IProduct} from "../types/product.interface";
import {map, Observable,
} from "rxjs";
import {IOrder} from "../types/order.interface";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(searchString?: string):Observable<IProduct[]> {
    let params = new HttpParams();
    if (searchString) {
      params = params.append('search', searchString);
    }
    return this.http.get<IProduct[]>('https://testologia.ru/tea', {params})
      .pipe(
        map( products => {
          if (Array.isArray(products)) {
            return products;
          }
          return Object.values(products);
        })
      );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://testologia.ru/tea?id=${id}`)
  }

  createOrder(data: IOrder): Observable<{success: number, message?: string}> {
    return this.http.post<{success: number, message?: string}>(`https://testologia.ru/order-tea`, data);
  }
}
