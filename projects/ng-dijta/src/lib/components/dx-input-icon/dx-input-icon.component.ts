import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, first } from 'rxjs/operators';
import {
  UI_COMPONENT_CONFIG,
  UIConfigWrapper
} from '../../core/UI/service/input/ui-component.config';
import { DxIconSelectionPopupComponent, IconConfig } from '../dx-icon-selection-popup';

@Component({
  selector: 'dx-input-icon',
  templateUrl: './dx-input-icon.component.html',
  styleUrls: ['./dx-input-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputIconComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputIconComponent),
      multi: true
    }
  ],
})
export class DxInputIconComponent
  implements ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() currencyFormat: "wide" | "narrow" = "narrow";
  @Input() currencyPosition: "left" | "right" = "left";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() mask: string = '';
  @Input() placeholder: string = 'Select Icon';
  @Input() icon: string = 'search';
  @Input() value: string | undefined;
  @Input() iconConfig: IconConfig | undefined;

  ctrRequired: boolean | undefined;
  @Input() labelPosition: 'left' | 'top' = 'top';
  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.onTouched();
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

  openIcon(): void {
    const dialogRef: MatDialogRef<DxIconSelectionPopupComponent> =
      this.dialog.open(DxIconSelectionPopupComponent, {
        panelClass: ['lookout-modal-box'],
        width: '70%',
      });
    dialogRef.componentInstance.iconConfig = this.iconConfig;
    dialogRef.afterClosed().pipe(
      filter((val: string) => !!val),
      first()
    ).subscribe((val: string) => {
      this.value = val;
      this.onChange(this.value);
      this.cd.detectChanges();
    });
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
