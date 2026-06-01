import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { KeyValueModel } from '../../core/UI/model/keyValue';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { OnSelectChange } from './dx-select.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dx-select',
  templateUrl: './dx-select.component.html',
  styleUrls: ['./dx-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxSelectComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxSelectComponent implements ControlValueAccessor, Validator {
  @Input() options!: KeyValueModel[];
  @Input() emptyOption: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() value: string | string[] = '';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' =
    'none-floating';
  @Output() onSelectChange: EventEmitter<OnSelectChange> =
    new EventEmitter<OnSelectChange>();
  @Output() onUserChange: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  searchTextboxControl = new FormControl();
  control: FormControl = new FormControl();
  filteredList!: KeyValueModel[];
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' =
    'filled-error';

  // To get required
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To set required
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  ctrRequired: boolean | undefined;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  static nextId = 0;
  @HostBinding()
  @Input()
  id = `dx-input-select-${DxSelectComponent.nextId++}`;

  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value); // optional
    this._disabled = value;
  }

  filterSubscription!: Subscription;
  controlDisable: boolean = false;
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };

  onUserSelection(event: MatSelectChange): void {
  this.onUserChange.emit(event.value);
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }

  inputChange(event: string | string[]): void {
    this.value = event;
    this.onChange(this.value);
    this.onSelectChange.emit({
      value: event,
    });
  }

  writeValue(value: string | string): void {
    this.onTouched();
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  filterOptions(): void {
    this._filter(this.searchTextboxControl?.value);
  }

  clearSearch(event: any): void {
    this.searchTextboxControl.reset(); // Clears the input field
    event.stopPropagation();
  }

  getOptions(): KeyValueModel[] {
    if (this.searchTextboxControl?.value) {
      return this.filteredList;
    } else {
      return this.options;
    }
  }

  private _filter(filterValue: string): void {
    this.filteredList = this.options?.filter(
      (option: KeyValueModel) =>
        option?.valueTt?.toLowerCase().indexOf(filterValue?.toLowerCase()) === 0
    );
  }

  getDisplayValue(value: string): string {
    return (
      this.options.find((option: KeyValueModel) => option.keyTt === value)
        ?.valueTt ?? ''
    );
  }

  getBackgroundColor(selectedOption): string | undefined {
    let option = this.options?.find(
      (option: KeyValueModel) =>
        option?.keyTt?.toString()?.toLowerCase() ===
        selectedOption?.toLowerCase()
    );
    return option?.color;
  }

  onDropDownChange(evt: MatSelectChange): void {
    const payload: OnSelectChange = {
      value: evt?.value,
    };
    this.onSelectChange.emit(payload);
  }

  // Method called by the form when the control's disabled state changes
  setDisabledState(isDisabled: boolean): void {
    this.controlDisable = isDisabled;
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription?.unsubscribe();
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }
}
