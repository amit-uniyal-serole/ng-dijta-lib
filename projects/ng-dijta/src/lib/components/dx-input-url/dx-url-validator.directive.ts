import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[dxUrlValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DxUrlValidatorDirective,
      multi: true
    }
  ]
})
export class DxUrlValidatorDirective implements Validator {

  // ✅ Allows underscores, hyphens, spaces (unencoded), query params, fragments, etc.
  private readonly urlPattern: RegExp =
    /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=%\s-]*)?$/i;

  private readonly standardUrlPattern: RegExp =
    /^(https?:\/\/)?[a-zA-Z0-9.-]+(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=%\s-]*)?$/i;

  @Input() custom: boolean = false;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (!value || typeof value !== 'string') {
      return null; // Allow empty (handled by 'required')
    }

    const pattern = this.custom ? this.urlPattern : this.standardUrlPattern;

    if (!pattern.test(value)) {
      return {
        urlInvalid: {
          value,
          message: 'Invalid URL format'
        }
      };
    }

    return null;
  }
}
