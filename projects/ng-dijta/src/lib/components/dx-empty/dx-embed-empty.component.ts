import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    Type,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';


import { DxEmptyCustomContent, DxEmptySize, DX_EMPTY_COMPONENT_NAME } from './config';
import { DxSafeAny } from '../../core/outlet/type/any';
import { DxConfigService } from '../../core/config/config.service';

function getEmptySize(componentName: string): DxEmptySize {
    switch (componentName) {
        case 'table':
        case 'list':
            return 'normal';
        case 'select':
        case 'tree-select':
        case 'cascader':
        case 'transfer':
            return 'small';
        default:
            return '';
    }
}

type DxEmptyContentType = 'component' | 'template' | 'string';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'dx-embed-empty',
    exportAs: 'dxEmbedEmpty',
    template: `
    <ng-container *ngIf="!content && specificContent !== null" [ngSwitch]="size">
      <dx-empty *ngSwitchCase="'normal'" class="dx-empty-normal" [dxNotFoundImage]="'simple'"></dx-empty>
      <dx-empty *ngSwitchCase="'small'" class="dx-empty-small" [dxNotFoundImage]="'simple'"></dx-empty>
      <dx-empty *ngSwitchDefault></dx-empty>
    </ng-container>
    <ng-container *ngIf="content">
      <ng-template *ngIf="contentType !== 'string'" [cdkPortalOutlet]="contentPortal"></ng-template>
      <ng-container *ngIf="contentType === 'string'">
        {{ content }}
      </ng-container>
    </ng-container>
  `
})
export class DxEmbedEmptyComponent implements OnChanges, OnInit, OnDestroy {
    @Input() nzComponentName?: string;
    @Input() specificContent?: DxEmptyCustomContent;

    content?: DxEmptyCustomContent;
    contentType: DxEmptyContentType = 'string';
    contentPortal?: Portal<DxSafeAny>;
    size: DxEmptySize = '';

    private destroy$ = new Subject<void>();

    constructor(
        private configService: DxConfigService,
        private viewContainerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private injector: Injector
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.nzComponentName) {
            this.size = getEmptySize(changes.nzComponentName.currentValue);
        }

        if (changes.specificContent && !changes.specificContent.isFirstChange()) {
            this.content = changes.specificContent.currentValue;
            this.renderEmpty();
        }
    }

    ngOnInit(): void {
        this.subscribeDefaultEmptyContentChange();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private renderEmpty(): void {
        const content = this.content;

        if (typeof content === 'string') {
            this.contentType = 'string';
        } else if (content instanceof TemplateRef) {
            const context = { $implicit: this.nzComponentName } as DxSafeAny;
            this.contentType = 'template';
            this.contentPortal = new TemplatePortal(content, this.viewContainerRef, context);
        } else if (content instanceof Type) {
            const injector = Injector.create({
                parent: this.injector,
                providers: [{ provide: DX_EMPTY_COMPONENT_NAME, useValue: this.nzComponentName }]
            });
            this.contentType = 'component';
            this.contentPortal = new ComponentPortal(content, this.viewContainerRef, injector);
        } else {
            this.contentType = 'string';
            this.contentPortal = undefined;
        }

        this.cdr.detectChanges();
    }

    private subscribeDefaultEmptyContentChange(): void {
        this.configService
            .getConfigChangeEventForComponent('empty')
            .pipe(startWith(true), takeUntil(this.destroy$))
            .subscribe(() => {
                this.content = this.specificContent || this.getUserDefaultEmptyContent();
                this.renderEmpty();
            });
    }

    private getUserDefaultEmptyContent(): Type<DxSafeAny> | TemplateRef<string> | string | undefined {
        return (this.configService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent;
    }
}
