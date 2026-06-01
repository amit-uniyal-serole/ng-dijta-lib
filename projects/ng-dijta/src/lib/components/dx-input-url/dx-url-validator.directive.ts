import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[dxUrlValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DxUrlValidatorDirective,
    multi: true
  }]
})
export class DxUrlValidatorDirective implements Validator {
  reg: RegExp = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && !this.reg.test(control.value)) {
      return { 'urlInvalid': true };
    }
    return null;
  }
}