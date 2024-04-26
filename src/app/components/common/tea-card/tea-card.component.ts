import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../../types/product.interface";

@Component({
  selector: 'tea-card',
  templateUrl: './tea-card.component.html',
  styleUrls: ['./tea-card.component.scss']
})
export class TeaCardComponent implements OnInit {

  @Input()
  get product(): IProduct {
    return this._product;
  }
  set product(data: IProduct) {
    this._product = data
  }

  private _product: IProduct = {} as IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
