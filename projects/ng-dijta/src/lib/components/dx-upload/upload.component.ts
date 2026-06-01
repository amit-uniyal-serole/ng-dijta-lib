
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, of } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  DxUploadAction,
  DxIconRenderTemplate,
  DxShowUploadList,
  DxUploadChangeParam,
  DxUploadFile,
  DxUploadListType,
  DxUploadTransformFileType,
  DxUploadType,
  DxUploadXHRArgs,
  UploadFilter,
  ZipButtonOptions
} from './interface';
import { DxUploadBtnComponent } from './upload-btn.component';
import { DxUploadListComponent } from './upload-list.component';
import { NumberInput, BooleanInput } from '@angular/cdk/coercion';
import { InputNumber, InputBoolean, toBoolean } from '../../utils/convert';
import { DxSafeAny } from '../../core/outlet/type/any';

@Component({
  selector: 'dx-upload',
  exportAs: 'dxUpload',
  templateUrl: './upload.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.dx-upload-picture-card-wrapper]': 'dxListType === "picture-card"'
  }
})
export class DxUploadComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  static ngAcceptInputType_dxLimit: NumberInput;
  static ngAcceptInputType_dxSize: NumberInput;
  static ngAcceptInputType_dxDirectory: BooleanInput;
  static ngAcceptInputType_dxOpenFileDialogOnClick: BooleanInput;
  static ngAcceptInputType_dxDisabled: BooleanInput;
  static ngAcceptInputType_dxMultiple: BooleanInput;
  static ngAcceptInputType_dxShowUploadList: BooleanInput | DxShowUploadList;
  static ngAcceptInputType_dxShowButton: BooleanInput;
  static ngAcceptInputType_dxWithCredentials: BooleanInput;

  private destroy$ = new Subject<void>();
  @ViewChild('uploadComp', { static: false }) uploadComp!: DxUploadBtnComponent;
  @ViewChild('listComp', { static: false }) listComp!: DxUploadListComponent;
  @ViewChild('uploadBtn') button: ElementRef | undefined;

  dir: Direction = 'ltr';

  // #region fields

  @Input() dxType: DxUploadType = 'select';
  @Input() @InputNumber() dxLimit = 0;
  @Input() @InputNumber() dxSize = 0;

  @Input() dxFileType?: string;
  @Input()  tabIndex:number | undefined;
  @Input() dxAccept?: string | string[];
  @Input() dxFileMaxCount!:number;
  @Input() dxAction?: string | ((file: DxUploadFile) => string | Observable<string>);
  @Input() @InputBoolean() dxDirectory = false;
  @Input() @InputBoolean() dxOpenFileDialogOnClick = true;
  @Input() dxBeforeUpload?: (file: DxUploadFile, fileList: DxUploadFile[]) => boolean | Observable<boolean>;
  @Input() dxCustomRequest?: (item: DxUploadXHRArgs) => Subscription;
  @Input() dxData?: {} | ((file: DxUploadFile) => {} | Observable<{}>);
  @Input() dxFilter: UploadFilter[] = [];
  @Input() dxFileList: DxUploadFile[] = [];
  @Input() @InputBoolean() dxDisabled = false;
  @Input() dxHeaders?: {} | ((file: DxUploadFile) => {} | Observable<{}>);
  @Input() dxListType: DxUploadListType = 'text';
  @Input() @InputBoolean() dxMultiple = false;
  @Input() dxName = 'file';
  @Input() dxUploadAction: DxUploadAction[] = [
    {
      label: 'WorkDrive',
      event: 'WORKDRIVE'
    }
  ];

  private _showUploadList: boolean | DxShowUploadList = true;

  @Input()
  set dxShowUploadList(value: boolean | DxShowUploadList) {
    this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
  }

  get dxShowUploadList(): boolean | DxShowUploadList {
    return this._showUploadList;
  }

  @Input() @InputBoolean() dxShowButton = true;
  @Input() @InputBoolean() dxWithCredentials = false;

  @Input() dxRemove?: (file: DxUploadFile) => boolean | Observable<boolean>;
  @Input() dxPreview?: (file: DxUploadFile) => void;
  @Input() dxPreviewFile?: (file: DxUploadFile) => Observable<string>;
  @Input() dxPreviewIsImage?: (file: DxUploadFile) => boolean;
  @Input() dxTransformFile?: (file: DxUploadFile) => DxUploadTransformFileType;
  @Input() dxDownload?: (file: DxUploadFile) => void;
  @Input() dxIconRender: DxIconRenderTemplate | null = null;
  @Input() dxFileListRender: TemplateRef<{ $implicit: DxUploadFile[] }> | null = null;

  @Output() readonly dxChange: EventEmitter<DxUploadChangeParam> = new EventEmitter<DxUploadChangeParam>();
  @Output() readonly dxFileListChange: EventEmitter<DxUploadFile[]> = new EventEmitter<DxUploadFile[]>();
  @Output() readonly dxOtherAction: EventEmitter<DxUploadAction> = new EventEmitter<DxUploadAction>();

  _btnOptions?: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.dxShowUploadList === 'boolean' && this.dxShowUploadList) {
      this.dxShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true
      };
    }
    // filters
    const filters: UploadFilter[] = this.dxFilter.slice();
    if (this.dxMultiple && this.dxLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
      filters.push({
        name: 'limit',
        fn: (fileList: DxUploadFile[]) => fileList.slice(-this.dxLimit)
      });
    }
    if (this.dxSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
      filters.push({
        name: 'size',
        fn: (fileList: DxUploadFile[]) => fileList.filter(w => w.size! / 1024 <= this.dxSize)
      });
    }
    if (this.dxFileType && this.dxFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
      const types = this.dxFileType.split(',');
      filters.push({
        name: 'type',
        fn: (fileList: DxUploadFile[]) => fileList.filter(w => ~types.indexOf(w.type!))
      });
    }
    this._btnOptions = {
      disabled: this.dxDisabled,
      accept: this.dxAccept,
      action: this.dxAction,
      directory: this.dxDirectory,
      openFileDialogOnClick: this.dxOpenFileDialogOnClick,
      beforeUpload: this.dxBeforeUpload,
      customRequest: this.dxCustomRequest,
      data: this.dxData,
      headers: this.dxHeaders,
      name: this.dxName,
      multiple: this.dxMultiple,
      withCredentials: this.dxWithCredentials,
      filters,
      transformFile: this.dxTransformFile,
      onStart: this.onStart,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onError: this.onError,
      dxFileMaxCount:this.dxFileMaxCount
    };
    return this;
  }

  // #endregion

  constructor(
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: DxSafeAny,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) { }

  // #region upload

  private fileToObject(file: DxUploadFile): DxUploadFile {
    
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename ?? file.name,
      filename: file.filename ?? file.name,
      fileName: file?.filename ?? file?.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      uploadResponse: file.response, // image component upload Prop      
      error: file.error,
      percent: 0,
      originFileObj: file as DxSafeAny,
      file: file as any// image component upload Prop
    };
  }

  private getFileItem(file: DxUploadFile, fileList: DxUploadFile[]): DxUploadFile {
    return fileList.filter(item => item.uid === file.uid)[0];
  }

  private removeFileItem(file: DxUploadFile, fileList: DxUploadFile[]): DxUploadFile[] {
    return fileList.filter(item => item.uid !== file.uid);
  }

  private onStart = (file: DxUploadFile): void => {
    if (!this.dxFileList) {
      this.dxFileList = [];
    }
    const targetItem = this.fileToObject(file);
    targetItem.status = 'uploading';
    this.dxFileList = this.dxFileList?.concat(targetItem);
    this.dxFileListChange.emit(this.dxFileList);
    this.dxChange.emit({ file: targetItem, fileList: this.dxFileList, type: 'start' });
    this.detectChangesList();
  };

  private onProgress = (e: { percent: number }, file: DxUploadFile): void => {
    const fileList = this.dxFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.percent = e.percent;
    this.dxChange.emit({
      event: e,
      file: { ...targetItem },
      fileList: this.dxFileList,
      type: 'progress'
    });
    this.detectChangesList();
  };

  private onSuccess = (res: {}, file: DxUploadFile): void => {
    const fileList = this.dxFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.status = 'done';
    targetItem.response = res;
    this.dxChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'success'
    });
    this.detectChangesList();
  };

  private onError = (err: {}, file: DxUploadFile): void => {
    const fileList = this.dxFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.error = err;
    targetItem.status = 'error';
    this.dxChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'error'
    });
    this.detectChangesList();
  };

  // #endregion

  // #region drag

  private dragState?: string;

  // skip safari bug
  fileDrop(e: DragEvent): void {
    if (e.type === this.dragState) {
      return;
    }
    this.dragState = e.type;
    this.setClassMap();
  }

  // #endregion

  // #region list

  private detectChangesList(): void {
    this.cdr.detectChanges();
    this.listComp?.detectChanges();
  }

  onRemove = (file: DxUploadFile): void => {
    this.uploadComp.abort(file);
    file.status = 'removed';
    const fnRes =
      typeof this.dxRemove === 'function' ? this.dxRemove(file) : this.dxRemove == null ? true : this.dxRemove;
    (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((res: boolean) => res)).subscribe(() => {
      this.dxFileList = this.removeFileItem(file, this.dxFileList);
      this.dxChange.emit({
        file,
        fileList: this.dxFileList,
        type: 'removed'
      });
      this.dxFileListChange.emit(this.dxFileList);
      this.cdr.detectChanges();
    });
  };

  // #endregion

  // #region styles

  private prefixCls = 'dx-upload';
  classList: string[] = [];

  private setClassMap(): void {
    let subCls: string[] = [];
    if (this.dxType === 'drag') {
      if (this.dxFileList?.some(file => file.status === 'uploading')) {
        subCls.push(`${this.prefixCls}-drag-uploading`);
      }
      if (this.dragState === 'dragover') {
        subCls.push(`${this.prefixCls}-drag-hover`);
      }
    } else {
      subCls = [`${this.prefixCls}-select-${this.dxListType}`];
    }

    this.classList = [
      this.prefixCls,
      `${this.prefixCls}-${this.dxType}`,
      ...subCls,
      (this.dxDisabled && `${this.prefixCls}-disabled`) || '',
      (this.dir === 'rtl' && `${this.prefixCls}-rtl`) || ''
    ].filter(item => !!item);

    this.cdr.detectChanges();
  }

  ofterAction(event: DxUploadAction): void {
    this.dxOtherAction.emit(event);
  }

  // #endregion

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.setClassMap();
      this.cdr.detectChanges();
    });
  }


  ngAfterViewInit(): void {
    // fix firefox drop open new tab
    this.ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.document.body, 'drop')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          event.preventDefault();
          event.stopPropagation();
        })
    );
  }

  ngOnChanges(): void {
    this.zipOptions().setClassMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
