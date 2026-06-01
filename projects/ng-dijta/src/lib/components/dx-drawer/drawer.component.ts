import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DxConfigKey } from '../../core/config/config';
import { DxConfigService, WithConfig } from '../../core/config/config.service';
import { DxSafeAny } from '../../core/outlet/type/any';
import { NgStyleInterface } from '../../core/outlet/type/ng-class';
import { InputBoolean, toCssPixel } from '../../utils/convert';


import { DxDrawerContentDirective } from './drawer-content.directive';
import {
    DRAWER_DEFAULT_SIZE,
    DRAWER_LARGE_SIZE,
    DxDrawerOptionsOfComponent,
    DxDrawerPlacement,
    DxDrawerSize
} from './drawer-options';
import { DxDrawerRef } from './drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

const NZ_CONFIG_MODULE_NAME: DxConfigKey = 'drawer';

@Component({
    selector: 'dx-drawer',
    exportAs: 'dxDrawer',
    template: `
    <ng-template #drawerTemplate>
      <div
        class="dx-drawer"
        [nzNoAnimation]="dxNoAnimation"
        [class.dx-drawer-rtl]="dir === 'rtl'"
        [class.dx-drawer-open]="isOpen"
        [class.no-mask]="!dxMask"
        [class.dx-drawer-top]="dxPlacement === 'top'"
        [class.dx-drawer-bottom]="dxPlacement === 'bottom'"
        [class.dx-drawer-right]="dxPlacement === 'right'"
        [class.dx-drawer-left]="dxPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="dxZIndex"
        [ngClass]="dxWrapClassName"
      >
        <div class="dx-drawer-mask" (click)="maskClick()" *ngIf="dxMask" [ngStyle]="dxMaskStyle"></div>
        <div
          class="dx-drawer-content-wrapper {{ nzWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="dx-drawer-content">
            <div class="dx-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div
                *ngIf="dxTitle || dxClosable"
                class="dx-drawer-header"
                [class.dx-drawer-header-close-only]="!dxTitle"
              >
                <div class="dx-drawer-header-title">
                  <button
                    *ngIf="dxClosable"
                    (click)="closeClick()"
                    aria-label="Close"
                    class="dx-drawer-close"
                    style="--scroll-bar: 0px;"
                  >
                    <ng-container *dxStringTemplateOutlet="dxCloseIcon; let closeIcon">
                      <span class="material-icons">
                        {{closeIcon}}
                        </span>
                    </ng-container>
                  </button>
                  <div *ngIf="dxTitle" class="dx-drawer-title">
                    <ng-container *dxStringTemplateOutlet="dxTitle">
                      <div [innerHTML]="dxTitle | transloco" dx-tooltip dxTooltipTitle="{{dxTitle | transloco}}"></div>
                    </ng-container>
                  </div>
                </div>
                <div *ngIf="dxExtra" class="dx-drawer-extra">
                  <ng-container *dxStringTemplateOutlet="dxExtra">
                    <div [innerHTML]="dxExtra | transloco"></div>
                  </ng-container>
                </div>
              </div>
              <div class="dx-drawer-body" [ngStyle]="dxBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="dxContent; else contentElseTemp">
                  <ng-container *ngIf="isTemplateRef(dxContent)">
                    <ng-container *ngTemplateOutlet="$any(dxContent); context: templateContext"></ng-container>
                  </ng-container>
                </ng-container>
                <ng-template #contentElseTemp>
                  <ng-container *ngIf="contentFromContentChild && (isOpen || inAnimation)">
                    <ng-template [ngTemplateOutlet]="contentFromContentChild"></ng-template>
                  </ng-container>
                </ng-template>
              </div>
              <div *ngIf="dxFooter" class="dx-drawer-footer">
                <ng-container *dxStringTemplateOutlet="dxFooter">
                  <div [innerHTML]="dxFooter | transloco"></div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DxDrawerComponent<T = DxSafeAny, R = DxSafeAny, D = DxSafeAny>
    extends DxDrawerRef<T, R>
    implements OnInit, OnDestroy, AfterViewInit, OnChanges, DxDrawerOptionsOfComponent {
    readonly _nzModuleName: DxConfigKey = NZ_CONFIG_MODULE_NAME;
    static ngAcceptInputType_nzClosable: BooleanInput;
    static ngAcceptInputType_nzMaskClosable: BooleanInput;
    static ngAcceptInputType_nzMask: BooleanInput;
    static ngAcceptInputType_nzNoAnimation: BooleanInput;
    static ngAcceptInputType_nzKeyboard: BooleanInput;
    static ngAcceptInputType_nzCloseOnNavigation: BooleanInput;

    @Input() dxContent!: TemplateRef<{ $implicit: D; drawerRef: DxDrawerRef<R> }> | Type<T>;
    @Input() dxCloseIcon: string | TemplateRef<void> = 'close';
    @Input() @InputBoolean() dxClosable: boolean = true;
    @Input() @WithConfig() @InputBoolean() dxMaskClosable: boolean = true;
    @Input() @WithConfig() @InputBoolean() dxMask: boolean = true;
    @Input() @WithConfig() @InputBoolean() dxCloseOnNavigation: boolean = true;
    @Input() @InputBoolean() dxNoAnimation = false;
    @Input() @InputBoolean() dxKeyboard: boolean = true;
    @Input() dxTitle?: string | TemplateRef<{}>;
    @Input() dxExtra?: string | TemplateRef<{}>;
    @Input() dxFooter?: string | TemplateRef<{}>;
    @Input() dxPlacement: DxDrawerPlacement = 'right';
    @Input() dxSize: DxDrawerSize = 'default';
    @Input() dxMaskStyle: NgStyleInterface = {};
    @Input() dxBodyStyle: NgStyleInterface = {};
    @Input() dxWrapClassName?: string;
    @Input() dxWidth?: number | string;
    @Input() dxHeight?: number | string;
    @Input() dxZIndex = 1000;
    @Input() dxOffsetX = 0;
    @Input() dxOffsetY = 0;
    private componentInstance: T | null = null;

    @Input()
    set nzVisible(value: boolean) {


        this.isOpen = value;
    }

    get nzVisible(): boolean {
        return this.isOpen;
    }

    @Output() readonly dxOnViewInit = new EventEmitter<void>();
    @Output() readonly dxOnClose = new EventEmitter<MouseEvent>();
    @Output() readonly dxVisibleChange = new EventEmitter<boolean>();

    @ViewChild('drawerTemplate', { static: true }) drawerTemplate!: TemplateRef<void>;
    @ViewChild(CdkPortalOutlet, { static: false }) bodyPortalOutlet?: CdkPortalOutlet;
    @ContentChild(DxDrawerContentDirective, { static: true, read: TemplateRef })
    contentFromContentChild?: TemplateRef<DxSafeAny>;

    private destroy$ = new Subject<void>();
    previouslyFocusedElement?: HTMLElement;
    placementChanging = false;
    placementChangeTimeoutId = -1;
    dxContentParams: Partial<D> | undefined; // only service
    overlayRef?: OverlayRef | null;
    portal?: TemplatePortal;
    focusTrap?: FocusTrap;
    isOpen = false;
    inAnimation = false;
    templateContext: { $implicit: Partial<D> | undefined; drawerRef: DxDrawerRef<R> } = {
        $implicit: undefined,
        drawerRef: this as DxDrawerRef<R>
    };

    get offsetTransform(): string | null {
        if (!this.isOpen || this.dxOffsetX + this.dxOffsetY === 0) {
            return null;
        }
        switch (this.dxPlacement) {
            case 'left':
                return `translateX(${this.dxOffsetX}px)`;
            case 'right':
                return `translateX(-${this.dxOffsetX}px)`;
            case 'top':
                return `translateY(${this.dxOffsetY}px)`;
            case 'bottom':
                return `translateY(-${this.dxOffsetY}px)`;
        }
    }

    get transform(): string | null {
        if (this.isOpen) {
            return null;
        }

        switch (this.dxPlacement) {
            case 'left':
                return `translateX(-100%)`;
            case 'right':
                return `translateX(100%)`;
            case 'top':
                return `translateY(-100%)`;
            case 'bottom':
                return `translateY(100%)`;
        }
    }

    get width(): string | null {
        if (this.isLeftOrRight) {
            const defaultWidth = this.dxSize === 'large' ? DRAWER_LARGE_SIZE : DRAWER_DEFAULT_SIZE;
            return this.dxWidth === undefined ? toCssPixel(defaultWidth) : toCssPixel(this.dxWidth);
        }
        return null;
    }

    get height(): string | null {
        if (!this.isLeftOrRight) {
            const defaultHeight = this.dxSize === 'large' ? DRAWER_LARGE_SIZE : DRAWER_DEFAULT_SIZE;
            return this.dxHeight === undefined ? toCssPixel(defaultHeight) : toCssPixel(this.dxHeight);
        }
        return null;
    }

    get isLeftOrRight(): boolean {
        return this.dxPlacement === 'left' || this.dxPlacement === 'right';
    }

    nzAfterOpen = new Subject<void>();
    nzAfterClose = new Subject<R>();

    get afterOpen(): Observable<void> {
        return this.nzAfterOpen.asObservable();
    }

    get afterClose(): Observable<R> {
        return this.nzAfterClose.asObservable();
    }

    isTemplateRef(value: {}): boolean {
        return value instanceof TemplateRef;
    }

    // from service config
    @WithConfig() dxDirection?: Direction = undefined;

    dir: Direction = 'ltr';

    constructor(
        private cdr: ChangeDetectorRef,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        @Optional() @Inject(DOCUMENT) private document: DxSafeAny,
        public DxConfigService: DxConfigService,
        private renderer: Renderer2,
        private overlay: Overlay,
        private injector: Injector,
        private changeDetectorRef: ChangeDetectorRef,
        private focusTrapFactory: FocusTrapFactory,
        private viewContainerRef: ViewContainerRef,
        private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
        @Optional() private directionality: Directionality
    ) {

        super();
    }

    ngOnInit(): void {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.dxDirection || this.directionality.value;

        this.attachOverlay();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.templateContext = { $implicit: this.dxContentParams, drawerRef: this as DxDrawerRef<R> };
        this.changeDetectorRef.detectChanges();
    }

    ngAfterViewInit(): void {
        this.attachBodyContent();
        // The `setTimeout` triggers change detection. There's no sense to schedule the DOM timer if anyone is
        // listening to the `nzOnViewInit` event inside the template, for instance `<dx-drawer (nzOnViewInit)="...">`.
        if (this.dxOnViewInit.observers.length) {
            setTimeout(() => {
                this.dxOnViewInit.emit();
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { nzPlacement, nzVisible } = changes;
        if (nzVisible) {
            const value = changes.nzVisible.currentValue;
            if (value) {
                this.open();
            } else {
                this.close();
            }
        }
        if (nzPlacement && !nzPlacement.isFirstChange()) {
            this.triggerPlacementChangeCycleOnce();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        clearTimeout(this.placementChangeTimeoutId);
        this.disposeOverlay();
    }

    private getAnimationDuration(): number {
        return this.dxNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
    }

    // Disable the transition animation temporarily when the placement changing
    private triggerPlacementChangeCycleOnce(): void {
        if (!this.dxNoAnimation) {
            this.placementChanging = true;
            this.changeDetectorRef.markForCheck();
            clearTimeout(this.placementChangeTimeoutId);
            this.placementChangeTimeoutId = window.setTimeout(() => {
                this.placementChanging = false;
                this.changeDetectorRef.markForCheck();
            }, this.getAnimationDuration());
        }
    }

    close(result?: R): void {
        this.isOpen = false;
        this.inAnimation = true;
        this.dxVisibleChange.emit(false);
        this.updateOverlayStyle();
        this.overlayKeyboardDispatcher.remove(this.overlayRef!);
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.updateBodyOverflow();
            this.restoreFocus();
            this.inAnimation = false;
            this.nzAfterClose.next(result!);
            this.nzAfterClose.complete();
            this.componentInstance = null;
        }, this.getAnimationDuration());
    }

    open(): void {
        this.attachOverlay();
        this.isOpen = true;
        this.inAnimation = true;
        this.dxVisibleChange.emit(true);
        this.overlayKeyboardDispatcher.add(this.overlayRef!);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.inAnimation = false;
            this.changeDetectorRef.detectChanges();
            this.nzAfterOpen.next();
        }, this.getAnimationDuration());
    }

    getContentComponent(): T | null {
        return this.componentInstance;
    }

    closeClick(): void {
        this.dxOnClose.emit();
    }

    maskClick(): void {
        if (this.dxMaskClosable && this.dxMask) {
            this.dxOnClose.emit();
        }
    }

    private attachBodyContent(): void {
        this.bodyPortalOutlet!.dispose();

        if (this.dxContent instanceof Type) {
            const childInjector = Injector.create({
                parent: this.injector,
                providers: [{ provide: DxDrawerRef, useValue: this }]
            });
            const componentPortal = new ComponentPortal<T>(this.dxContent, null, childInjector);
            const componentRef = this.bodyPortalOutlet!.attachComponentPortal(componentPortal);
            this.componentInstance = componentRef.instance;
            Object.assign(componentRef.instance as {}, this.dxContentParams);
            componentRef.changeDetectorRef.detectChanges();
        }
    }

    private attachOverlay(): void {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayRef!.keydownEvents()
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: KeyboardEvent) => {
                    if (event.keyCode === ESCAPE && this.isOpen && this.dxKeyboard) {
                        this.dxOnClose.emit();
                    }
                });
            this.overlayRef
                .detachments()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.disposeOverlay();
                });
        }
    }

    private disposeOverlay(): void {
        this.overlayRef?.dispose();
        this.overlayRef = null;
    }

    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            disposeOnNavigation: this.dxCloseOnNavigation,
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
    }

    private updateOverlayStyle(): void {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
        }
    }

    private updateBodyOverflow(): void {
        if (this.overlayRef) {
            if (this.isOpen) {
                this.overlayRef.getConfig().scrollStrategy!.enable();
            } else {
                this.overlayRef.getConfig().scrollStrategy!.disable();
            }
        }
    }

    savePreviouslyFocusedElement(): void {
        if (this.document && !this.previouslyFocusedElement) {
            this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
            // We need the extra check, because IE's svg element has no blur method.
            if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.blur === 'function') {
                this.previouslyFocusedElement.blur();
            }
        }
    }

    private trapFocus(): void {
        if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
            this.focusTrap = this.focusTrapFactory.create(this.overlayRef!.overlayElement);
            this.focusTrap.focusInitialElement();
        }
    }

    private restoreFocus(): void {
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}