import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-input-company',
  templateUrl: './dx-input-company.component.html',
  styleUrls: ['./dx-input-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputCompanyComponent
  implements OnChanges, ControlValueAccessor {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() mask: string = '';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() placeholder: string = 'Company Name';
  @Input() pattern!: string;
  @Input() icon: string = 'apartment';
  _NAME_REGEXP = /^[a-zA-Z0-9\s][^|=]{2,}$/;
  value: string = '';

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Self() @Optional() public control: NgControl,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    private readonly cd: ChangeDetectorRef
  ) {
    this.control && (this.control.valueAccessor = this);
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cd?.detectChanges();
  }
  public get invalid(): boolean {
    return this.control ? this.control.invalid! : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched)! : false;
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
    if (this.value) {
      if (!this.isValidName(this.value)) {
        this.control.control?.setErrors({ invalid: true });
      } else {
        this.control.control?.setErrors(null);
      }
    }
  }

  writeValue(value: string): void {
    this.onTouched();
    this.value = this.control.value;
    this.value = value;
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

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }

  isValidName(nameString: string): boolean {
    try {
      let nameValidation = this.pattern || this._NAME_REGEXP;
      let pattern = new RegExp(nameValidation);
      return pattern.test(nameString);
    } catch (TypeError) {
      return false;
    }
  }
}
