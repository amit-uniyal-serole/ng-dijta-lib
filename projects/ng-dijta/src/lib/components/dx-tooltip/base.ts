import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { asapScheduler, Subject } from 'rxjs';
import { delay, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { isNotNil } from '../../utils/check';
import { toBoolean } from '../../utils/convert';
import { DxTSType } from '../../utils/types/template';
import { DxSafeAny } from '../../core/outlet/type/any';
import { NgClassInterface, NgStyleInterface } from '../../core/outlet/type/ng-class';
import { BooleanInput } from '../../utils/types/convert-input';
import { DxNoAnimationDirective } from '../../core/no-animation/dx-no-animation.directive';
import { DxConfigService } from '../../core/config/config.service';
import { PopConfirmConfig, PopoverConfig } from '../../core/config/config';
import { POSITION_TYPE, POSITION_MAP, DEFAULT_TOOLTIP_POSITIONS, getPlacementName } from '../../core/overlay/overlay-position';

export interface PropertyMapping {
  [key: string]: [string, () => unknown];
}

export type DxTooltipTrigger = 'click' | 'focus' | 'hover' | null;

@Directive()
export abstract class DxTooltipBaseDirective implements OnChanges, OnDestroy, AfterViewInit {
  arrowPointAtCenter?: boolean;
  config?: Required<PopoverConfig | PopConfirmConfig>;
  directiveTitle?: DxTSType | null;
  directiveContent?: DxTSType | null;
  title?: DxTSType | null;
  content?: DxTSType | null;
  trigger?: DxTooltipTrigger;
  placement?: string | string[];
  origin?: ElementRef<HTMLElement>;
  visible?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: NgStyleInterface;
  visibleChange = new EventEmitter<boolean>();

  /**
   * For create tooltip dynamically. This should be override for each different component.
   */
  protected componentRef!: ComponentRef<DxTooltipBaseComponent>;

  /**
   * This true title that would be used in other parts on this component.
   */
  protected get _title(): DxTSType | null {
    return this.title || this.directiveTitle || null;
  }

  protected get _content(): DxTSType | null {
    return this.content || this.directiveContent || null;
  }

  protected get _trigger(): DxTooltipTrigger {
    return typeof this.trigger !== 'undefined' ? this.trigger : 'hover';
  }

  protected get _placement(): string[] {
    const p = this.placement;
    return Array.isArray(p) && p.length > 0 ? p : typeof p === 'string' && p ? [p] : ['top'];
  }

  protected get _visible(): boolean {
    return (typeof this.visible !== 'undefined' ? this.visible : this.internalVisible) || false;
  }

  protected get _mouseEnterDelay(): number {
    return this.mouseEnterDelay || 0.15;
  }

  protected get _mouseLeaveDelay(): number {
    return this.mouseLeaveDelay || 0.1;
  }

  protected get _overlayClassName(): string | null {
    return this.overlayClassName || null;
  }

  protected get _overlayStyle(): NgStyleInterface | null {
    return this.overlayStyle || null;
  }

  private internalVisible = false;

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      noAnimation: ['noAnimation', () => !!this.noAnimation]
    };
  }

  component?: DxTooltipBaseComponent;

  protected readonly destroy$ = new Subject<void>();
  protected readonly triggerDisposables: Array<() => void> = [];

  private delayTimer?: number | ReturnType<typeof setTimeout>;

  constructor(
    public elementRef: ElementRef,
    protected hostView: ViewContainerRef,
    protected resolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected noAnimation?: DxNoAnimationDirective,
    protected dxConfigService?: DxConfigService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { trigger } = changes;

    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }

    if (this.component) {
      this.updatePropertiesByChanges(changes);
    }
  }

  ngAfterViewInit(): void {
    this.createComponent();
    this.registerTriggers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Clear toggling timer. Issue #3875 #4317 #4386
    this.clearTogglingTimer();
    this.removeTriggerListeners();
  }

  show(): void {
    this.component?.show();
  }

  hide(): void {
    this.component?.hide();
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.component) {
      this.component.updatePosition();
    }
  }

  /**
   * Create a dynamic tooltip component. This method can be override.
   */
  protected createComponent(): void {
    const componentRef = this.componentRef;
    this.component = componentRef.instance as DxTooltipBaseComponent;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      componentRef.location.nativeElement
    );
    this.component.setOverlayOrigin(this.origin || this.elementRef);

    this.initProperties();

    const ngVisibleChange$ = this.component.dxVisibleChange.pipe(distinctUntilChanged());

    ngVisibleChange$.pipe(takeUntil(this.destroy$)).subscribe((visible: boolean) => {
      this.internalVisible = visible;
      this.visibleChange.emit(visible);
    });

    // In some cases, the rendering takes into account the height at which the `arrow` is in wrong place,
    // so `cdk` sets the container position incorrectly.
    // To avoid this, after placing the `arrow` in the correct position, we should `re-calculate` the position of the `overlay`.
    ngVisibleChange$
      .pipe(
        filter((visible: boolean) => visible),
        delay(0, asapScheduler),
        filter(() => Boolean(this.component?.overlay?.overlayRef)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.component?.updatePosition();
      });
  }

  protected registerTriggers(): void {
    // When the method gets invoked, all properties has been synced to the dynamic component.
    // After removing the old API, we can just check the directive's own `dxTrigger`.
    const el = this.elementRef.nativeElement;
    const trigger = this.trigger;

    this.removeTriggerListeners();

    if (trigger === 'hover') {
      let overlayElement: HTMLElement;
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseenter', () => {
          this.delayEnterLeave(true, true, this._mouseEnterDelay);
        })
      );
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseleave', () => {
          this.delayEnterLeave(true, false, this._mouseLeaveDelay);
          if (this.component?.overlay.overlayRef && !overlayElement) {
            overlayElement = this.component.overlay.overlayRef.overlayElement;
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseenter', () => {
                this.delayEnterLeave(false, true, this._mouseEnterDelay);
              })
            );
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseleave', () => {
                this.delayEnterLeave(false, false, this._mouseLeaveDelay);
              })
            );
          }
        })
      );
    } else if (trigger === 'focus') {
      this.triggerDisposables.push(this.renderer.listen(el, 'focusin', () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, 'focusout', () => this.hide()));
    } else if (trigger === 'click') {
      this.triggerDisposables.push(
        this.renderer.listen(el, 'click', (e: MouseEvent) => {
          e.preventDefault();
          this.show();
        })
      );
    }
    // Else do nothing because user wants to control the visibility programmatically.
  }

  private updatePropertiesByChanges(changes: SimpleChanges): void {
    this.updatePropertiesByKeys(Object.keys(changes));
  }

  private updatePropertiesByKeys(keys?: string[]): void {
    const mappingProperties: PropertyMapping = {
      // common mappings
      title: ['dxTitle', () => this._title],
      directiveTitle: ['dxTitle', () => this._title],
      content: ['dxContent', () => this._content],
      directiveContent: ['dxContent', () => this._content],
      trigger: ['dxTrigger', () => this._trigger],
      placement: ['dxPlacement', () => this._placement],
      visible: ['dxVisible', () => this._visible],
      mouseEnterDelay: ['dxMouseEnterDelay', () => this._mouseEnterDelay],
      mouseLeaveDelay: ['dxMouseLeaveDelay', () => this._mouseLeaveDelay],
      overlayClassName: ['dxOverlayClassName', () => this._overlayClassName],
      overlayStyle: ['dxOverlayStyle', () => this._overlayStyle],
      arrowPointAtCenter: ['dxArrowPointAtCenter', () => this.arrowPointAtCenter],
      ...this.getProxyPropertyMap()
    };

    (keys || Object.keys(mappingProperties).filter(key => !key.startsWith('directive'))).forEach(
      (property: DxSafeAny) => {
        if (mappingProperties[property]) {
          const [name, valueFn] = mappingProperties[property];
          this.updateComponentValue(name, valueFn());
        }
      }
    );

    this.component?.updateByDirective();
  }

  private initProperties(): void {
    this.updatePropertiesByKeys();
  }

  private updateComponentValue(key: string, value: DxSafeAny): void {
    if (typeof value !== 'undefined') {
      // @ts-ignore
      this.component[key] = value;
    }
  }

  private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
    if (this.delayTimer) {
      this.clearTogglingTimer();
    } else if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = undefined;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      // `isOrigin` is used due to the tooltip will not hide immediately
      // (may caused by the fade-out animation).
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }

  private removeTriggerListeners(): void {
    this.triggerDisposables.forEach(dispose => dispose());
    this.triggerDisposables.length = 0;
  }

  private clearTogglingTimer(): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }
  }
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class DxTooltipBaseComponent implements OnDestroy, OnInit {
  static ngAcceptInputType_nzVisible: BooleanInput;
  static ngAcceptInputType_dxArrowPointAtCenter: BooleanInput;

  @ViewChild('overlay', { static: false }) overlay!: CdkConnectedOverlay;

  dxTitle: DxTSType | null = null;
  dxContent: DxTSType | null = null;
  dxArrowPointAtCenter: boolean = false;
  dxOverlayClassName!: string;
  dxOverlayStyle: NgStyleInterface = {};
  dxBackdrop = false;
  dxMouseEnterDelay?: number;
  dxMouseLeaveDelay?: number;

  dxVisibleChange = new Subject<boolean>();

  set dxVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
      this.dxVisibleChange.next(visible);
    }
  }

  get dxVisible(): boolean {
    return this._visible;
  }

  _visible = false;

  set dxTrigger(value: DxTooltipTrigger) {
    this._trigger = value;
  }

  get dxTrigger(): DxTooltipTrigger {
    return this._trigger;
  }

  protected _trigger: DxTooltipTrigger = 'hover';

  set dxPlacement(value: POSITION_TYPE[]) {
    const preferredPosition = value.map(placement => POSITION_MAP[placement]);
    this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
  }

  preferredPlacement: string = 'top';

  origin!: ElementRef<DxSafeAny>;

  public dir: Direction = 'ltr';

  _classMap: NgClassInterface = {};

  _prefix = 'dx-tooltip';

  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];

  protected destroy$ = new Subject<void>();

  constructor(
    public cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    public noAnimation?: DxNoAnimationDirective
  ) { }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.dxVisibleChange.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  show(): void {
    if (this.dxVisible) {
      return;
    }

    if (!this.isEmpty()) {
      this.dxVisible = true;
      this.dxVisibleChange.next(true);
      this.cdr.detectChanges();
    }

    // for ltr for overlay to display tooltip in correct placement in rtl direction.
    if (this.origin && this.overlay && this.overlay.overlayRef && this.overlay.overlayRef.getDirection() === 'rtl') {
      this.overlay.overlayRef.setDirection('ltr');
    }
  }

  hide(): void {
    if (!this.dxVisible) {
      return;
    }

    this.dxVisible = false;
    this.dxVisibleChange.next(false);
    this.cdr.detectChanges();
  }

  updateByDirective(): void {
    this.updateStyles();
    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.updatePosition();
      this.updateVisibilityByTitle();
    });
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.preferredPlacement = getPlacementName(position)!;
    this.updateStyles();

    // We have to trigger immediate change detection or the element would blink.
    this.cdr.detectChanges();
  }

  setOverlayOrigin(origin: ElementRef<HTMLElement>): void {    
    this.origin = origin;
    this.cdr.markForCheck();
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.origin.nativeElement.contains(event.target) && this.dxTrigger !== null) {
      this.hide();
    }
  }

  /**
   * Hide the component while the content is empty.
   */
  private updateVisibilityByTitle(): void {
    if (this.isEmpty()) {
      this.hide();
    }
  }

  protected updateStyles(): void {
    this._classMap = {
      [this.dxOverlayClassName]: true,
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true
    };
  }

  /**
   * Empty component cannot be opened.
   */
  protected abstract isEmpty(): boolean;
}

export function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean {
  return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
