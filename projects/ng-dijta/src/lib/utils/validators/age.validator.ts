import { AgeUtil } from '../calculator/age.calculator';
interface AgeError {
  [x: string]: boolean;
}
export class DobValidators {
  static AgeValidator(
    value: Date,
    error = 'incorrect',
    minAge = 18
  ): { [key: string]: boolean } | null {
    const calculatedAge:number = AgeUtil.ageCalculator(value);
    const ageError: AgeError = {
      [error]: true,
    };

    if (calculatedAge < minAge) {
      return ageError;
    }

    return null;
  }
}
