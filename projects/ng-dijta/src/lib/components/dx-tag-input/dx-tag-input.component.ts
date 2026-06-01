import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  Input,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
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
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {
  MatMenuTrigger,
  MenuPositionX,
  MenuPositionY,
} from '@angular/material/menu';
import { isEmpty, isNil } from 'lodash';
import {
  UI_COMPONENT_CONFIG,
  UIConfigWrapper,
} from '../../core/UI/service/input/ui-component.config';
import { Tag } from './tag';
@Component({
  selector: 'dx-tag-input',
  templateUrl: './dx-tag-input.component.html',
  styleUrls: ['./dx-tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTagInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxTagInputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxTagInputComponent implements ControlValueAccessor, Validator {
  @ViewChild(MatAutocompleteTrigger) trigger1!: MatAutocompleteTrigger;
  @ViewChild('dx-tag-mat-menu') elementView!: ElementRef;
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() focus: boolean = false;
  @Input() row: number = 2;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' =
    'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() xPosition: MenuPositionX = 'after';
  @Input() yPosition: MenuPositionY = 'below';
  @Input() availableTag: Tag[] = [];
  @Input() key: string = '';
  @Input() maxlength: number = 25;
  @Input() isFilter: boolean = true;
  @Input() autofocus: boolean = false;
  @Input() isColorPickerOpen: boolean = false;
  @Input() disableTagCreation: boolean = false;
  @Input() palette: string[] = ['#FF5733', '#3498DB', '#2ECC71', '#F1C40F', '#E67E22', '#9B59B6', '#E91E63', '#95A5A6', '#34495E', '#1ABC9C', '#16A085', '#5DADE2', '#A3E4D7', '#8E44AD', '#F39C12'];
  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;
  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' =
    'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  @Input() allowDelete: boolean = true;
  @Input() disableCreate: boolean = false;

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

  tagName: FormControl = new FormControl();

  static nextId = 0;
  @HostBinding()
  id = `dx-input-tag-${DxTagInputComponent.nextId++}`;

  addOnBlur = true;
  value: Tag[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  filterTags: Tag[] = [];
  showAddTag = false;
  color: string | undefined;
  parentWidth: number | undefined;

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };
  handleClose() {
    if (this.isColorPickerOpen) {
      Promise.resolve().then(() => this.trigger1.openPanel());
    }
  }

  // To bind component with controller
  ngAfterViewInit(): void {
    this.cd.detectChanges();
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsTouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
        if (this.focus) {
          setTimeout(() => {
            this.input.nativeElement.focus()
          })
        }
      });
    }
  }
  oClose(): void {
    this.trigger.closeMenu();
  }
  inputChange(event: Tag[]): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: Tag[]): void {
    if (isNil(value) && isEmpty(value)) {
      value = [];
    }
    this.value = Array.isArray(value) ? value : [value];
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
  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.add(event.option.value.name, event.option.value.colorCode, event.option.value.pkId)
  }
  add(
    name: string | undefined,
    color: string | undefined,
    id?: string | number
  ): void {
    this.value.push({
      name: name,
      colorCode: color,
      [this.key ? this.key : 'id']: id,
    });
    const selectItemIndex: number = this.filterTags.findIndex(
      (tag: Tag) => tag.name === name
    );
    if (selectItemIndex !== -1) {
      this.filterTags.splice(selectItemIndex, 1);
    }
    this.tagName.reset();
    this.input.nativeElement.value = '';
    this.isColorPickerOpen = false;
    this.color = undefined;
  }
  onAutoComplete(): void {
    if (!this.color) {
      this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  }
  onSearch(event: string): void {
    if (this.tagName.value) {
      this.showAddTag = this.filter(event).length === 0;
      this.filterTags = this.filter(event);
    } else {
      this.showAddTag = false;
    }
  }
  remove(event: Tag): void {
    const selectItemIndex: number = this.value.findIndex(
      (tag: Tag) => tag.name === event.name
    );
    if (selectItemIndex !== -1) {
      this.value.splice(selectItemIndex, 1);
      this.filterTags = this.filter();
    }
  }

  private filter(search?: string): Tag[] {
    if (!search) {
      return this.availableTag.filter(
        (item) => !this.value.some((val) => val.name === item.name)
      );
    }
    return this.availableTag
      .filter((item) => !this.value.some((val) => val.name === item.name))
      .filter((ser: Tag) => ser.name?.toString()?.toLowerCase().includes(search?.toString()?.toLowerCase()));
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
