import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CoordinatesService } from './coordinates.service';
import { Direction } from './direction.enum';
import { getValidTransformationType } from './getTransformationType';
import { TransformationType } from './transformation-type.enum';

@Directive({
  selector: '[dxCoordinates]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CoordinatesDirective,
    multi: true
  }]
})
export class CoordinatesDirective implements Validator {

  // To hold transformed coordinate value
  coordinateValue: string | number = '';

  // To hold coordinate direction
  @Input() direction: Direction | undefined;

  // To hold transformation type
  @Input() transformationType!: TransformationType;

  constructor(private el: ElementRef, private coordinatesService: CoordinatesService) { }

  onInput(value?): void {
    if (value) {
      value = value.toString().replace(/[ _]+/g, "");
      if (value.contains('°\'"')) {
        value = value.replace('°\'"', '°');
      }
      if (value.contains('°\'')) {
        value = value.replace('°\'', '°');
      }
      if (value.contains('\'"')) {
        value = value.replace('\'"', '\'');
      }
      this.coordinateValue = this.coordinatesService.transform(value, getValidTransformationType(this.transformationType), this.direction);
    }
  }

  validate(control: AbstractControl<any, any>) {
    this.onInput(control?.value);
    if (control?.value && !this.coordinateValue) {
      return {
        dxCoordinates: {
          valid: false
        }
      };
    } else {
      return null;
    }
  }

}
