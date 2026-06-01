/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
const DxEmptyDefaultImages = ['default', 'simple'] as const;
type DxEmptyNotFoundImageType = typeof DxEmptyDefaultImages[number] | null | string | TemplateRef<void>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'dx-empty',
  exportAs: 'dxEmpty',
  template: `
      <div class="dx-empty-image">
        <ng-container *ngIf="!isImageBuildIn">
          <ng-container *dxStringTemplateOutlet="dxNotFoundImage">
            <img [src]="dxNotFoundImage" [alt]="isContentString ? dxNotFoundContent : 'empty'" />
          </ng-container>
        </ng-container>
        <dx-empty-default *ngIf="isImageBuildIn && dxNotFoundImage !== 'simple'"></dx-empty-default>
        <dx-empty-simple *ngIf="isImageBuildIn && dxNotFoundImage === 'simple'"></dx-empty-simple>
      </div>
     
      <p class="dx-empty-description" *ngIf="dxNotFoundContent !== null">
        <ng-container *dxStringTemplateOutlet="dxNotFoundContent">
          {{ isContentString ? dxNotFoundContent : ('No Data' | transloco) }}
        </ng-container>
      </p>
      <div class="dx-empty-footer" *ngIf="dxNotFoundFooter">
        <ng-container *dxStringTemplateOutlet="dxNotFoundFooter">
          {{ dxNotFoundFooter }}
        </ng-container>
      </div>
    `,
  host: {
    class: 'dx-empty'
  }
})
export class DxEmptyComponent implements OnChanges, OnDestroy {
  @Input() dxNotFoundImage: DxEmptyNotFoundImageType = 'default';
  @Input() dxNotFoundContent?: string | TemplateRef<void> | null;
  @Input() dxNotFoundFooter?: string | TemplateRef<void>;

  isContentString = false;
  isImageBuildIn = true;

  private readonly destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { dxNotFoundContent, dxNotFoundImage } = changes;

    if (dxNotFoundContent) {
      const content = dxNotFoundContent.currentValue;
      this.isContentString = typeof content === 'string';
    }

    if (dxNotFoundImage) {
      const image = dxNotFoundImage.currentValue || 'default';
      this.isImageBuildIn = DxEmptyDefaultImages.findIndex(i => i === image) > -1;
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}