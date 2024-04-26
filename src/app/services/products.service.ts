import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../types/product.interface";
import {Observable} from "rxjs";
import {IOrder} from "../types/order.interface";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(searchString?: string):Observable<IProduct[]> {
    if (searchString) {
      return this.http.get<IProduct[]>(`https://testologia.ru/tea?search=${searchString}`);
    }
    return this.http.get<IProduct[]>('https://testologia.ru/tea');
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://testologia.ru/tea?id=${id}`)
  }

  createOrder(data: IOrder): Observable<{success: number, message?: string}> {
    return this.http.post<{success: number, message?: string}>(`https://testologia.ru/order-tea`, data);
  }
}
