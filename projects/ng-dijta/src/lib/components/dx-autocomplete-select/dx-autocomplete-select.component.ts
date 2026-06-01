import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  HostListener,
  Inject,
  Optional,
  Self,
  SimpleChanges,
  OnChanges,
  forwardRef,
  Injector,
  LOCALE_ID,
  HostBinding
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
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, map, first } from 'rxjs/operators';
import { UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../core';
import { KeyValueModel } from '../../core/UI/model/keyValue';
import { CreateOption } from './dx-autocomplete-select.model';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'dx-autocomplete-select',
  templateUrl: './dx-autocomplete-select.component.html',
  styleUrls: ['./dx-autocomplete-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxAutocompleteSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxAutocompleteSelectComponent),
      multi: true
    }
  ],
})
export class DxAutocompleteSelectComponent
  implements
  ControlValueAccessor,
  OnInit,
  OnChanges,
  Validator,
  OnDestroy {
  @Input() loading: boolean = false;
  @Input() options!: KeyValueModel[];
  @Input() disabled: boolean = false;
  @Input() showToolTip: boolean = true;
  @Input() country: boolean = false;
  @Input() emptyOption: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() createOption: CreateOption = {}
  @Input() multiple: boolean = false;
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
  control: FormControl = new FormControl();
  @Input() tabIndex!: number;
  @ViewChild('inputRef') inputRef!: ElementRef;
  @ViewChild('singleSelect') singleSelect!: MatSelect;
  @Output() onSelectChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUserChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onBlur: EventEmitter<string> = new EventEmitter<string>();
  @Output() onautoCompleteSelect: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onClickCreateOption: EventEmitter<void> =
    new EventEmitter<void>();
  searchCtrl: FormControl = new FormControl();
  filteredOptions!: Observable<KeyValueModel[]>;
  selectedValue!: string;
  filteredList!: Observable<KeyValueModel[]>;
  obj!: KeyValueModel | undefined;
  searchCntrlSubscription!: Subscription;
  filterSubscription!: Subscription;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-autoselect-${DxAutocompleteSelectComponent.nextId++}`;
  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef) {
    this.outline = config?.value?.outline ?? "none-floating";
  }

  ngOnInit(): void {
    this.refillList();
    this.searchCntrlSubscription = this.searchCtrl?.valueChanges?.subscribe(
      (res: string) => {
        if (res && res != '') {
          this.onautoCompleteSelect.emit(res);
        }
      }
    );
    this.createOption.label = this.createOption?.label ?? 'Create New Option'
  }


  onChange: Function = () => { };
  onTouched: Function = () => { };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.options?.currentValue !== changes?.options?.previousValue) {
      this.initFilterList();
      this.refillList();
      this.cd?.detectChanges();
    }
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
  writeValue(value: string): void {
    if (value) {
      this.onSelectChange.emit(value);
    }
    this.onTouched();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  refillList(): void {
    this.filteredList = of(this.options);
  }

  private _filter(option: string): KeyValueModel[] {
    const filterValue: string = option?.toLowerCase();
    return this.options?.filter(
      (option: KeyValueModel) =>
        option?.valueTt?.toLowerCase()?.indexOf(filterValue) === 0
    );
  }

  initFilterList(): void {
    this.filteredOptions = this.searchCtrl?.valueChanges?.pipe(
      startWith(''),
      map((value: KeyValueModel) =>
        typeof value === 'string' ? value : value?.valueTt
      ),
      map((name: string) => (name ? this._filter(name) : this.options?.slice()))
    );
  }
  onDropDownChange(value: string): void {
    this.onChange(value);
    this.selectedValue = value;
    this.onSelectChange.emit(value);
    this.onBlur.emit(value);
  }
  onUserSelect(option: MatSelectChange): void {
    if (option?.value)
      this.onUserChange.emit(option.value);
  }

  onClickCreateCustomOption(): void {
    this.singleSelect?.close()
    this.onClickCreateOption?.emit()
  }
  ngOnDestroy(): void {
    if (this.searchCntrlSubscription) {
      this.searchCntrlSubscription?.unsubscribe();
    }
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
