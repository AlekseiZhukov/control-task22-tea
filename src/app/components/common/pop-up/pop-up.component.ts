import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  @Input()
  get isPopUp() {
    return this._isPopUp
  }
  set isPopUp(param:boolean) {
    this._isPopUp = param
  }

  private _isPopUp: boolean = false;

  @Output() showPopUpEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isShowButton: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  togglePopUp() {
    this.showPopUpEvent.emit(!this._isPopUp)
  }

}
