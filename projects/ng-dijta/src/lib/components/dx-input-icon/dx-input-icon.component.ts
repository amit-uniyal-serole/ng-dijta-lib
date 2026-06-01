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
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';
import { DxIconSelectionPopupComponent } from '../dx-icon-selection-popup';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'dx-input-icon',
  templateUrl: './dx-input-icon.component.html',
  styleUrls: ['./dx-input-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputIconComponent
  implements OnChanges, ControlValueAccessor {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() mask: string = '';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() placeholder: string = 'Select Icon';
  @Input() icon: string = 'search';
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
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {
    this.control && (this.control.valueAccessor = this);
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  ngOnChanges(): void {
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

  openIcon(): void {
    const dialogRef: MatDialogRef<DxIconSelectionPopupComponent> =
      this.dialog.open(DxIconSelectionPopupComponent, {
        panelClass: ['lookout-modal-box'],
        width: '70%',
      });

    dialogRef.afterClosed().pipe(
      filter((val: string) => !!val),
      first()
    ).subscribe((val: string) => {
      this.control.control?.setValue(val);
      this.onChange(this.value);
    });
  }
}
