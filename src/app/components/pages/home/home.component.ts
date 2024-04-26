declare var $: any;
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isPopUp: boolean = false;
  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable<boolean>((observer) => {
      const timeout = setTimeout(() => {
        observer.next(true)
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout)
        }
      }
    })
  }

  ngOnInit(): void {
    $('#accordion').accordion({
      heightStyle: "content",
      icons: false
    });
    this.subscription = this.observable.subscribe((param: boolean) => {
      if (param) this.isPopUp = param;
    })

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  togglePopUp(param:boolean) {
    this.isPopUp = param;
  }

}
