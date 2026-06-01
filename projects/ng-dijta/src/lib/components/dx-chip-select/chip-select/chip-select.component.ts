import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, Optional, Self, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { KeyValueModel } from '../../../core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'chip-select',
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ChipSelectComponent },
  ],
})
export class ChipSelectComponent implements OnChanges, ControlValueAccessor, MatFormFieldControl<any> {
  @Input() multi: boolean = false;
  @Input() name: string | undefined;
  static nextId = 0;
  @ViewChild('chipSelection') areaInput!: HTMLInputElement;
  @ViewChild('hiddenInput') hiddenInput!: ElementRef;
  control: FormControl = new FormControl();
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  id = `example-tel-input-${ChipSelectComponent.nextId++}`;
  onChange = (_: any) => { };
  onTouched = () => { };
  @Input() options!: KeyValueModel[];
  @Input() readonly: boolean = false;

  selection: SelectionModel<string> = new SelectionModel<string>(false, []);
  get empty() {
    return !this.control;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy!: string;

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
    this._disabled ? this.control.disable() : this.control.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string[] | null {
    if (this.control.valid) {
      return this.control.value;
    }
    return null;
  }
  set value(value: string[] | null) {
    if (value) {
      this.selection.select(...value);
    }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.control.invalid && this.touched;
  }

  constructor(
    private dialog: MatDialog,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    private readonly cd: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      if (this.ngControl.control) {
        this.control = this.ngControl.control as FormControl;
      }
    }
  }
  autofilled?: boolean | undefined;
  onContainerClick(event: MouseEvent): void {
    if (this.control.valid) {
      // this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.required) {
      this.control.addValidators(Validators.required);
    } else {
      this.control.removeValidators(Validators.required);
    }
    this.control.markAsUntouched();
    if (changes['multi']?.currentValue !== changes['multi']?.previousValue) {
      this.selection = new SelectionModel<string>(this.multi, []);
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  writeValue(value: string | null): void {
    if (value) {
      if (Array.isArray(value)) {
        this.control.patchValue(value);
        this.selection.select(...value);
      } else {
        const values = value.split(',');
        this.control.patchValue(values);
        this.selection.select(...values);
      }
    } else {
      this.control.patchValue([]);
      this.selection.clear();
    }
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

  _handleInput(control: AbstractControl): void {
    this.onChange(this.value);
  }
  toggleSelection(item: string): void {
    this.hiddenInput.nativeElement.focus();
    this.selection.toggle(item);
    this.control.setValue(this.selection.selected)
    this.onChange(this.value);
  }
  check(item: KeyValueModel): boolean {
    if (item.keyTt) {
      return this.selection.isSelected(item.keyTt as string);
    }
    return false;
  }
}
