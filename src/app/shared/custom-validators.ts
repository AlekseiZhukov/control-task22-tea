import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {

  static phoneNumberValidator (control: AbstractControl): ValidationErrors | null {
    const result = /^\+?[1-9]{1}[0-9]{10}$/.test(control.value);
    return result ? null : {phone: {value: control.value}}

  }
  static addressValidator (control: AbstractControl): ValidationErrors | null {
    const result = /^[\w\sА-Яа-я\/-]+$/.test(control.value);
    return result ? null : {address: {value: control.value}}

  }
}
