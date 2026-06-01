import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { CoordinatesService } from '../directives/coordinates-directive/coordinates.service';
import { getValidTransformationType } from '../directives/coordinates-directive/getTransformationType';
import { TransformationType } from '../directives/coordinates-directive/transformation-type.enum';

@Directive({
  selector: '[coordinateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CoordinateValidator,
      multi: true,
    },
  ],
})
export class CoordinateValidator implements Validator {
  constructor(private coordinatesService: CoordinatesService) { }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value; // Get the value from the control

    if (value) {
      const latitude = value.latitude ?? null;
      const longitude = value.longitude ?? null;
      if (!this.coordinatesService.transform(latitude, getValidTransformationType(TransformationType.ToDegrees), 1)) {
        return {
          invalidLatitude: true
        }
      } else if (!this.coordinatesService.transform(longitude, getValidTransformationType(TransformationType.ToDegrees), 2)) {
        return {
          invalidLongitude: true
        }
      } else {
        return null; // Return null if validation passes
      }
    } else {
      return null;
    }

  }
}
