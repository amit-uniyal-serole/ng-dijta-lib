import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, Optional, Self, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { FilePickerAdapter } from '../../core/file-picker.adapter';
import { FilePreviewModel } from '../../core/file-preview.model';
import { UploaderAdapter } from '../../core/uploader-adapter';
import { AdapterDataModel, DxFileUploadType } from '../../model/dx-image-upload.model';
import { DxImpageUploadPopupComponent } from '../dx-impage-upload-popup/dx-impage-upload-popup.component';

/** Data structure for holding telephone number. */
// export class ImageUploadField {
//   constructor(public files: FilePreviewModel[]) { }
// }

@Component({
  selector: 'dx-image',
  templateUrl: './dx-image.component.html',
  styleUrls: ['./dx-image.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: DxImageComponent },
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class DxImageComponent implements OnChanges, ControlValueAccessor, MatFormFieldControl<FilePreviewModel[]> {
  static nextId = 0;
  @ViewChild('area') areaInput!: HTMLInputElement;
  @Input() adapterData!: AdapterDataModel;
  /** Max size of selected file in MB. Default: no limit */
  @Input()
  fileMaxSize!: number;
  /** Max count of file in multi-upload. Default: no limit */
  @Input()
  fileMaxCount!: number;
  /** Total Max size limit of all files in MB. Default: no limit */
  @Input()
  totalMaxSize!: number;
  parts: FormControl<FilePreviewModel[] | null> = new FormControl<FilePreviewModel[]>([]);
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'example-tel-input';
  id = `dx-image-input-${DxImageComponent.nextId++}`;
  onChange = (_: any) => { };
  onTouched = () => { };
  @Input() enableAutoUpload: boolean = false;
  @Input() tabIndex:number | undefined;
  @Input() uploadType!: DxFileUploadType;
  @Input() readonly: boolean = false;
  @Input() fileTypes: string[] = [];
  get empty() {
    return !this.parts;
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
  @Input() uploadBtnTitle!: string;
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
  get value(): FilePreviewModel[] | null {
    if (this.parts.valid) {
      return this.parts.value;
    }
    return null;
  }
  set value(tel: FilePreviewModel[] | null) {
    const files: FilePreviewModel[] | null = tel;
    this.parts.setValue(files);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }
  adapter!: FilePickerAdapter;
  constructor(
    private dialog: MatDialog,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    private readonly cd: ChangeDetectorRef,
    private readonly http: HttpClient
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.required) {
      this.parts.addValidators(Validators.required);
    } else {
      this.parts.removeValidators(Validators.required);
    }
    this.parts.markAsUntouched();
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

  onContainerClick() {
    if (this.parts.valid) {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(tel: FilePreviewModel[] | null): void {
    this.value = tel;
    this.onChange(this.value);
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

  openImageUploader(): void {
    const dialogRef: MatDialogRef<DxImpageUploadPopupComponent, FilePreviewModel[]> = this.dialog.open(DxImpageUploadPopupComponent, {
      panelClass: ['lookout-modal-box'],
      width: '60%',
      data: this.parts.value
    });
    dialogRef.componentInstance.adapterData = this.adapterData;
    dialogRef.componentInstance.enableAutoUpload = this.enableAutoUpload;
    dialogRef.componentInstance.uploadType = this.uploadType;
    dialogRef.componentInstance.fileMaxCount = this.fileMaxCount;
    dialogRef.componentInstance.totalMaxSize = this.totalMaxSize;
    dialogRef.componentInstance.fileMaxSize = this.fileMaxSize;
    dialogRef.componentInstance.fileTypes = this.fileTypes.length > 0 ? this.fileTypes: [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/gif",
  "image/avif"
];
    dialogRef.afterClosed().pipe(
      filter((val: FilePreviewModel[] | undefined) => !!val && val?.length > 0),
      first()
    ).subscribe((files: FilePreviewModel[] | undefined) => {
      if (files) {
        this.writeValue(files);
      }
    });
  }
  remove(index: number): void {
    const files: FilePreviewModel[] | null = this.parts.value;
    if (files) {
      if (!this.enableAutoUpload || !this.adapterData?.removeFileUrl) {
        files.splice(index, 1);
        this.writeValue(files);
      } else {
        if (this.adapterData?.removeFileUrl) {
          this.adapter = new UploaderAdapter(this.http, this.adapterData);
          this.adapter.removeFile(files[index]?.pkId!).subscribe(res => {
            if (res) {
              files.splice(index, 1);
              this.writeValue(files);
            }
          });
        }
      }
    }

  }

}
