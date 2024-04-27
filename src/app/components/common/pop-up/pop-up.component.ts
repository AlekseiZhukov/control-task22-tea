import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {Modal} from 'bootstrap';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnChanges, OnDestroy {
  @Input()
  get isPopUp() {
    return this._isPopUp
  }
  set isPopUp(param:boolean) {
    this._isPopUp = param
  }

  @ViewChild('modal', {static: true})
  private modalRef!: ElementRef<HTMLDivElement>;
  private modal!: Modal;
  private _isPopUp: boolean = false;

  @Output() showPopUpEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    if (this.isPopUp) {
      this.modal = new Modal(this.modalRef.nativeElement);
      this.modal.show();
      this.modalRef.nativeElement.addEventListener('hide.bs.modal', ()=> this.showPopUpEvent.emit(!this._isPopUp));
    }
  }

  ngOnDestroy() {
    this.modal.hide();
  }
  togglePopUp() {
    this.showPopUpEvent.emit(!this._isPopUp);
  }

}
