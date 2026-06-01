import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[dxNoLeadingTrailingSpaces]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoLeadingTrailingSpaceDirective, multi: true }]
})
export class NoLeadingTrailingSpaceDirective implements Validator {

  @Input() control!: AbstractControl;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && typeof value === 'string' && (value !== value?.trim())) {
      return { 'NoleadingTrailingSpaces': true };
    }

    return null;
  }

}
