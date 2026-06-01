import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, Optional, OnInit, ChangeDetectorRef, Inject, Injector, forwardRef, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../core/UI/service/input/ui-component.config';
import { MentionConfig } from '../../directive/mentions/dx-mention-config';

@Component({
  selector: 'dx-textarea',
  templateUrl: './dx-textarea.component.html',
  styleUrls: ['./dx-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxTextareaComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxTextareaComponent implements ControlValueAccessor, OnInit, Validator {
  @ViewChild('myTextarea') textarea!: ElementRef<HTMLTextAreaElement>;
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() tabIndex: number | undefined;
  @Input() row: number = 2;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() noneBorder: boolean = false;
  @Input() labelPosition: 'left' | 'top' = 'top';
  static nextId = 0;
  @HostBinding()
  id = `dx-input-textarea-${DxTextareaComponent.nextId++}`;
  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;
  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  @Input() mentionConfigDetails!: MentionConfig

  value: string = '';

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

  @Input() mask: string | undefined;
  @Input() maskingPatterns;
  @Input() dropSpecialCharacters: boolean = false;
  @Input() prefix: string | undefined;
  @Input() specialCharacters: string[] = []

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };

  // To bind component with controller
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


  ngOnInit() {
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.updateValueAndValidity();
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
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

  addNewLine(event: KeyboardEvent) {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    textarea.value += '\n';    
    this.textarea?.nativeElement?.focus();
    setTimeout(() => {
      const textarea = this.textarea?.nativeElement;
      if(textarea){
        textarea.scrollTop = textarea.scrollHeight;
      }
    }, 0);
  }
}
