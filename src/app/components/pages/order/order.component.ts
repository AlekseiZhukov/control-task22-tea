import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription, tap} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomValidators} from "../../../shared/custom-validators";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  private subscriptionValidForm: Subscription | null = null;
  private observableError: Observable<boolean>;
  private subscriptionError: Subscription | null = null;

  isSubmitButtonDisabled: boolean = true;
  isShowMessageCreateOrder: boolean = false;
  isShowErrorCreateOrder: boolean = false;

  orderForm = this.fb.group({
    orderName: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]],
    phone: ['', [Validators.required, CustomValidators.phoneNumberValidator]],
    country: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    address: ['', [Validators.required, CustomValidators.addressValidator]],
    comment: [''],
  })

  get orderName() {
    return this.orderForm.get('orderName');
  }

  get name() {
    return this.orderForm.get('name');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get postcode() {
    return this.orderForm.get('postcode');
  }

  get address() {
    return this.orderForm.get('address');
  }

  constructor(private activateRoute: ActivatedRoute,
              private fb: FormBuilder, private productsService: ProductsService) {
    this.observableError = new Observable<boolean>((observer) => {
      this.isShowErrorCreateOrder = true;
      const timeout = setTimeout(() => {
        observer.next(false)
      }, 3000);
      return {
        unsubscribe() {
          clearTimeout(timeout)
        }
      }
    })
  }

  ngOnInit(): void {
    this.subscription = this.activateRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.controls.orderName.setValue(params['product']);
        this.orderForm.controls.orderName.disable();
      }
    })

    this.subscriptionValidForm = this.orderForm.statusChanges
      .subscribe((params) => {
        this.isSubmitButtonDisabled = params !== 'VALID';
      })

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    this.subscriptionValidForm?.unsubscribe();
    this.subscriptionError?.unsubscribe();
  }

  sentOrder() {
    this.isShowErrorCreateOrder = false;
    this.isSubmitButtonDisabled = true;
    this.subscriptionOrder = this.productsService.createOrder({
      name: this.orderForm.controls.name.value,
      last_name: this.orderForm.controls.lastName.value,
      phone: this.orderForm.controls.phone.value,
      country: this.orderForm.controls.country.value,
      zip: this.orderForm.controls.postcode.value,
      product: this.orderForm.controls.orderName.value,
      address: this.orderForm.controls.address.value,
      comment: this.orderForm.controls.comment.value,
    })
      .pipe(
        tap(() => {
          this.isSubmitButtonDisabled = false;
          this.orderForm.controls.orderName.enable();
        })
      )
      .subscribe({
        next: (response) => {
          if (+response.success === 1 && !response.message) {
            this.orderForm.reset();
            this.isShowMessageCreateOrder = true;
          } else {
            this.subscriptionError = this.observableError.subscribe((param: boolean) => {
             this.isShowErrorCreateOrder = param;
            })
          }
        },
        error: () => {
          this.isSubmitButtonDisabled = false;
          this.subscriptionError = this.observableError.subscribe((param: boolean) => {
            this.isShowErrorCreateOrder = param;
          })
        }
      })
  }

}
