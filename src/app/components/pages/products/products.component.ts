import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {IProduct} from "../../../types/product.interface";
import {Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  products: IProduct[] = [];
  isLoading: boolean = false;
  title: string = 'Наши чайные коллекции';
  isEmptySearchData: boolean = false;

  constructor(private productsService: ProductsService, private router: Router, private activateRoute: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit(): void {
    if(this.searchService.searchString) {
      this.title = `Результаты поиска по запросу ${this.searchService.searchString}`
    }
    this.getProducts(this.searchService.searchString);
    this.subscriptionSearch = this.searchService.searchString$.subscribe((searchString) => {
      if (searchString) {
        this.title = `Результаты поиска по запросу ${searchString}`;
        this.getProducts(searchString)
      } else {
        this.title = 'Наши чайные коллекции';
        this.getProducts();
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }

  getProducts(searchString?: string) {
    this.isLoading = true;
    this.subscription = this.productsService.getProducts(searchString)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.isEmptySearchData = false;
        })
      )
      .subscribe({
        next: (data) => {
          if (data.length <= 0) {
            this.isEmptySearchData = true;
          }
          this.products = data
        },
        error: (error) => {
          console.log(error);
          //this.router.navigate(['/'])
        }
      })
  }

}
