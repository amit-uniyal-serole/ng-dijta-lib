import { UntypedFormControl } from '@angular/forms';
import { NumberType, parsePhoneNumberFromString, PhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js/max';

export const phoneNumberValidator = (control: UntypedFormControl) => {
  const error = { validatePhoneNumber: true };
  const notAllowed: NumberType[] = ['TOLL_FREE'];
  let numberInstance: PhoneNumber | undefined;
  if (control.value) {
    try {
      numberInstance = parsePhoneNumberFromString(control.value);
    } catch (e) {
      return error;
    }
    if (validatePhoneNumberLength(control.value)) {
      return error;
    }

    if (numberInstance && !numberInstance.isValid()) {

      if (!control.touched) {
        control.markAsTouched();
      }
      return error;
    } else if (numberInstance && numberInstance?.isValid() && notAllowed.some((nA: NumberType) => numberInstance?.getType() === nA)) {
      return {
        numberNotAllowedError: `Toll Free Not Allowed`
      }
    }
  }
  return null;
};
