import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../../types/product.interface";
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: IProduct = {} as IProduct;
  private subscriptionProduct: Subscription | null = null;

  constructor(private productsService: ProductsService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptionProduct = this.activateRoute.params.subscribe( (params) => {
      if (params['id']) {
        this.productsService.getProduct(+params['id'])
          .subscribe({
            next: (data) => this.product = data,
            error: (error) => {
              console.log(error);
              this.router.navigate(['/'])
            }
          })
      }
    })

  }
  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }

}
