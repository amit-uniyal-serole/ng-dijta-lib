import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component,
    OnDestroy,
    ViewChild,
    Input,
    ElementRef,
    Optional,
    Inject,
    Self,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormGroup,
    FormControl,
    FormBuilder,
    NgControl,
    AbstractControl,
    NG_VALIDATORS,
} from '@angular/forms';
import {
    MatFormFieldControl,
    MAT_FORM_FIELD,
    MatFormField,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { TransformationType } from '../directives/coordinates-directive/transformation-type.enum';
import { CoordinateValidator } from './dx-coordinate-validator'; import { CoordinateLatLong } from '../model/coordinate';
;
export class DxLatLong {
    constructor(public latitude: string, public longitude: string) { }
}

@Component({
    selector: 'lat-long-input',
    template: `
    <div
      role="group"
      class="lat-long-input-container"
      [formGroup]="parts"
     
      [attr.aria-labelledby]="_formField.getLabelId()"
      (focusin)="onFocusIn($event)"
      (focusout)="onFocusOut($event)"
    >
      <input
        type="number"
        class="lat-long-input-element"
        formControlName="latitude"
        dxCoordinates 
        [direction]="1"
        size='2'
        [transformationType]="transformationType?.ToDegrees"
        [tabIndex]="tabIndex"
        aria-label="Latitude code"
        [required]="required"
        (input)="_handleInput(parts.controls.latitude)"
        [readonly]="readonly"
        #latitude
      />
    
      <span class="lat-long-input-spacer">&#44;</span>
      <input
      type="number"
        class="lat-long-input-element"
        formControlName="longitude"
        [required]="required"
        dxCoordinates 
        [direction]="2"
        [tabIndex]="tabIndex"
        size='2'
        [transformationType]="transformationType?.ToDegrees"
        aria-label="Longitude code"
        (input)="_handleInput(parts.controls.longitude)"
        [readonly]="readonly"
        #longitude
      />
    </div>
  `,
    styles: [
        `
        .lat-long-input-container {
            display: flex;
        }

        .lat-long-input-element {
            border: none;
            background: none;
            padding: 0;
            outline: none;
            font: inherit;
            text-align: center;
            color: currentcolor;
            width: 100%;
        }

        .lat-long-input-spacer {
            opacity: 0;
            transition: opacity 200ms;
            scale: 1.5
        }

        :host.example-floating .lat-long-input-spacer {
            opacity: 1;
        }
        
        `
    ],
    providers: [
        { provide: MatFormFieldControl, useExisting: LatLongInput },
        {
            provide: NG_VALIDATORS,
            useClass: CoordinateValidator,
            multi: true,
        },
    ],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[id]': 'id',
    },

})
export class LatLongInput
    implements ControlValueAccessor, MatFormFieldControl<CoordinateLatLong | null>, OnDestroy {
    static nextId = 0;
    @ViewChild('latitude') latitude!: HTMLInputElement;
    @ViewChild('longitude') longitude!: HTMLInputElement;
    transformationType = TransformationType;
    parts: FormGroup<{
        latitude: FormControl;
        longitude: FormControl;
    }>;
    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'lat-long-input';
    id = `lat-long-input-${LatLongInput.nextId++}`;
    onChange = (_: any) => { };
    onTouched = () => { };

    get empty() {
        const {
            value: { latitude, longitude },
        } = this.parts;

        return !latitude && !longitude;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input('aria-describedby') userAriaDescribedBy!: string;
    @Input() tabIndex: number | undefined;
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder!: string;

    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = value;
        this.stateChanges.next();
    }
    private _readonly!: boolean;

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get value(): CoordinateLatLong | null {
        const {
            value: { latitude, longitude },
        } = this.parts;
        if ((latitude || longitude)) {
            return {
                latitude: latitude,
                longitude: longitude
            };
        }
        return null;
    }
    set value(tel: CoordinateLatLong | null) {
        const latitude = tel ? tel.latitude : null;
        const longitude = tel ? tel.longitude : null;
        this.parts.setValue({
            latitude: latitude,
            longitude: longitude
        });
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.parts.invalid && this.touched;
    }

    constructor(
        formBuilder: FormBuilder,
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
        @Optional() @Self() public ngControl: NgControl
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }

        this.parts = formBuilder.group({
            latitude: [null],
            longitude: [null],
        });
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    onFocusIn(_event: FocusEvent) {
        if (!this.focused) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    onFocusOut(event: FocusEvent) {
        if (
            !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
        ) {
            this.touched = true;
            this.focused = false;
            this.onTouched();
            this.stateChanges.next();
        }
    }



    setDescribedByIds(ids: string[]) {
        const controlElement = this._elementRef.nativeElement.querySelector(
            '.lat-long-input-container'
        )!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick() {
        // No Implementations
    }

    writeValue(tel: CoordinateLatLong | null): void {
        this.value = tel;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _handleInput(_control: AbstractControl): void {
        this.onChange(this.value);
    }

}
