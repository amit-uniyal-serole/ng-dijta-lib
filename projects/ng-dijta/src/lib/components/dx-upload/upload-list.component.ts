
import { animate, style, transition, trigger } from '@angular/animations';
import { Direction } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject, fromEvent, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DxSafeAny } from '../../core/outlet/type/any';
import { DxIconRenderTemplate, DxShowUploadList, DxUploadFile, DxUploadListType } from './interface';

const isImageFileType = (type: string): boolean => !!type && type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;

type UploadListIconType = '' | 'uploading' | 'thumbnail';
type FileSize = 'B' | 'KB' | 'MB' | 'GB';
const extensions: Array<FileSize> = ['B', 'KB', 'MB', 'GB'];
interface UploadListFile extends DxUploadFile {
  isImageUrl?: boolean;
  isUploading?: boolean;
  iconType?: UploadListIconType;
  showDownload?: boolean;
}

@Component({
  selector: 'dx-upload-list',
  exportAs: 'dxUploadList',
  templateUrl: './upload-list.component.html',
  animations: [
    trigger('itemState', [
      transition(':enter', [
        style({ height: '0', width: '0', opacity: 0 }),
        animate(150, style({ height: '*', width: '*', opacity: 1 }))
      ]),
      transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
    ])
  ],
  host: {
    class: 'dx-upload-list',
    '[class.dx-upload-list-rtl]': `dir === 'rtl'`,
    '[class.dx-upload-list-text]': `listType === 'text'`,
    '[class.dx-upload-list-picture]': `listType === 'picture'`,
    '[class.dx-upload-list-picture-card]': `listType === 'picture-card'`
  },
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DxUploadListComponent implements OnChanges, OnDestroy {
  list: UploadListFile[] = [];
  private get showPic(): boolean {
    return this.listType === 'picture' || this.listType === 'picture-card';
  }

  @Input() locale: DxSafeAny = {};
  @Input() listType!: DxUploadListType;
  @Input()
  set items(list: DxUploadFile[]) {
    this.list = list;
  }
  @Input() icons!: DxShowUploadList;
  @Input() onPreview?: (file: DxUploadFile) => void;
  @Input() onRemove!: (file: DxUploadFile) => void;
  @Input() onDownload?: (file: DxUploadFile) => void;
  @Input() previewFile?: (file: DxUploadFile) => Observable<string>;
  @Input() previewIsImage?: (file: DxUploadFile) => boolean;
  @Input() iconRender: DxIconRenderTemplate | null = null;
  @Input() dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  private genErr(file: DxUploadFile): string {
    if (file.response && typeof file.response === 'string') {
      return file.response;
    }
    return (file.error && file.error.statusText) || this.locale.uploadError;
  }

  private extname(url: string): string {
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
  }

  isImageUrl(file: DxUploadFile): boolean {
    if (isImageFileType(file.type!)) {
      return true;
    }
    const url: string = (file.thumbUrl || file.url || '') as string;
    if (!url) {
      return false;
    }
    const extension = this.extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
      return true;
    } else if (/^data:/.test(url)) {
      // other file types of base64
      return false;
    } else if (extension) {
      // other file types which have extension
      return false;
    }
    return true;
  }

  private getIconType(file: UploadListFile): UploadListIconType {
    if (!this.showPic) {
      return '';
    }
    if (file.isUploading || (!file.thumbUrl && !file.url)) {
      return 'uploading';
    } else {
      return 'thumbnail';
    }
  }

  private previewImage(file: File | Blob): Observable<string> {
    if (!isImageFileType(file.type) || !this.platform.isBrowser) {
      return of('');
    }

    const canvas = this.doc.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    this.doc.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;
    return fromEvent(img, 'load').pipe(
      map(() => {
        const { width, height } = img;

        let drawWidth = MEASURE_SIZE;
        let drawHeight = MEASURE_SIZE;
        let offsetX = 0;
        let offsetY = 0;

        if (width < height) {
          drawHeight = height * (MEASURE_SIZE / width);
          offsetY = -(drawHeight - drawWidth) / 2;
        } else {
          drawWidth = width * (MEASURE_SIZE / height);
          offsetX = -(drawWidth - drawHeight) / 2;
        }

        try {
          ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } catch { }
        const dataURL = canvas.toDataURL();
        this.doc.body.removeChild(canvas);

        URL.revokeObjectURL(objectUrl);
        return dataURL;
      })
    );
  }

  private genThumb(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const win = window as DxSafeAny;
    if (
      !this.showPic ||
      typeof document === 'undefined' ||
      typeof win === 'undefined' ||
      !win.FileReader ||
      !win.File
    ) {
      return;
    }
    this.list
      .filter(file => file.originFileObj instanceof File && file.thumbUrl === undefined)
      .forEach(file => {
        file.thumbUrl = '';
        // Caretaker note: we shouldn't use promises here since they're not cancellable.
        // A promise microtask can be resolved after the view is destroyed. Thus running `detectChanges()`
        // will cause a runtime exception (`detectChanges()` cannot be run on destroyed views).
        const dataUrl$ = (this.previewFile ? this.previewFile(file) : this.previewImage(file.originFileObj!)).pipe(
          takeUntil(this.destroy$)
        );
        this.ngZone.runOutsideAngular(() => {
          dataUrl$.subscribe(dataUrl => {
            this.ngZone.run(() => {
              file.thumbUrl = dataUrl;
              this.detectChanges();
            });
          });
        });
      });
  }

  private showDownload(file: DxUploadFile): boolean {
    return !!(this.icons.showDownloadIcon && file.status === 'done');
  }

  private fixData(): void {
    this.list.forEach(file => {
      file.isUploading = file.status === 'uploading';
      file.message = this.genErr(file);
      file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      file.isImageUrl = this.previewIsImage ? this.previewIsImage(file) : this.isImageUrl(file);
      file.iconType = this.getIconType(file);
      file.showDownload = this.showDownload(file);
    });
  }

  handlePreview(file: DxUploadFile, e: Event): void {
    if (!this.onPreview) {
      return;
    }

    e.preventDefault();
    return this.onPreview(file);
  }

  handleRemove(file: DxUploadFile, e: Event): void {
    e.preventDefault();
    if (this.onRemove) {
      this.onRemove(file);
    }
    return;
  }

  handleDownload(file: DxUploadFile): void {
    if (typeof this.onDownload === 'function') {
      this.onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  }

  // #endregion

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: DxSafeAny,
    private ngZone: NgZone,
    private platform: Platform
  ) { }

  detectChanges(): void {
    this.fixData();
    this.cdr.detectChanges();
  }

  ngOnChanges(): void {
    this.fixData();
    this.genThumb();
  }

  public calculateSize(size: number, extensionIndex: number = 0): string {
    if (isNaN(size)) {
      size = 0;
    }

    if (size < 1024) {
      return `${Math.round(size * 100) / 100} ${extensions[extensionIndex]}`;
    }
    return this.calculateSize(size / 1024, extensionIndex + 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
