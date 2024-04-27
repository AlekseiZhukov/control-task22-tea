import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../../types/product.interface";
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {empty, mergeMap, Observable, of, scheduled, Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: IProduct = {} as IProduct;
  private subscription: Subscription = new Subscription();

  constructor(private productsService: ProductsService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription.add(this.activateRoute.params
      .pipe(
        mergeMap((params: Params): Observable<IProduct> => {
          if (params['id']) {
            return this.productsService.getProduct(params['id'])
          }
          return of()
        })
      )
      .subscribe({
        next: (product: IProduct) => this.product = product,
        error: (error) => {
          console.log(error);
          this.router.navigate(['/'])
        }
      }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
