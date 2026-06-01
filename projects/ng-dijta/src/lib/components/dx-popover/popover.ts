
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBigMotion } from '../../core/animation/zoom';
import { DxConfigKey } from '../../core/config/config';
import { DxConfigService, WithConfig } from '../../core/config/config.service';
import { DxNoAnimationDirective } from '../../core/no-animation/dx-no-animation.directive';
import { NgStyleInterface } from '../../core/outlet/type/ng-class';
import { InputBoolean } from '../../utils/convert';
import { DxTSType } from '../../utils/types/template';
import { DxToolTipComponent, DxTooltipBaseDirective, DxTooltipTrigger, PropertyMapping, isTooltipEmpty } from '../dx-tooltip';
import { Actions } from './model/popover.model';
import { Header } from '../dx-button/dx-button.model';

const DX_CONFIG_MODULE_NAME: DxConfigKey = 'popover';

@Directive({
  selector: '[dx-popover]',
  exportAs: 'dxPopover',
  host: {
    '[class.dx-popover-open]': 'visible'
  }
})
export class DxPopoverDirective extends DxTooltipBaseDirective implements OnChanges{
  static ngAcceptInputType_dxPopoverArrowPointAtCenter: BooleanInput;

  readonly _dxModuleName: DxConfigKey = DX_CONFIG_MODULE_NAME;

  @Input('dxPopoverArrowPointAtCenter') @InputBoolean() override arrowPointAtCenter?: boolean;
  @Input('dxPopoverTitle') override title?: DxTSType;
  @Input('dxPopoverContent') override content?: DxTSType;
  @Input('dx-popover') override directiveTitle?: DxTSType | null;
  @Input('dxPopoverTrigger') override trigger?: DxTooltipTrigger = 'hover';
  @Input('dxPopoverPlacement') override placement?: string | string[] = 'top';
  @Input('dxPopoverOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('dxPopoverVisible') override visible?: boolean;
  @Input('dxPopoverMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('dxPopoverMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('dxPopoverOverlayClassName') override overlayClassName?: string;
  @Input('dxPopoverOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input('dxActionButton') dxActionButton?: Actions;
  @Input('dxHeader') dxHeader?: Header;

  @Input() @WithConfig() dxPopoverBackdrop?: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('dxPopoverVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();

  @Input('dxPopoverContentContext') contentContext?: Object | null = null;

  @Input('dxPopoverTitleContext') titleContext?: Object | null = null;

  @Output() sendDetailData: EventEmitter<any> = new EventEmitter<any>();

  override componentRef: ComponentRef<DxPopoverComponent> = this.hostView.createComponent(DxPopoverComponent);

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      dxPopoverBackdrop: ['dxBackdrop', () => this.dxPopoverBackdrop],
      dxTooltipContentContext: ['dxContentContext', () => this.contentContext],
      dxTooltipTitleContext: ['dxTitleContext', () => this.titleContext],
      dxActionButton: ['dxActionButton', () => this.dxActionButton],
      dxHeader: ['dxHeader', ()=> this.dxHeader],
      ...super.getProxyPropertyMap()
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.trigger?.currentValue !== changes?.trigger?.previousValue) {
      this.trigger = changes?.trigger?.currentValue;
    }
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: DxNoAnimationDirective,
    dxConfigService?: DxConfigService
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation, dxConfigService);
    this.componentRef.instance.getDetailData.subscribe((data)=> {
      this.sendDetailData.emit();
    })
  }
}

@Component({
  selector: 'dx-popover',
  exportAs: 'dxPopoverComponent',
  animations: [zoomBigMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      dxConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [dxArrowPointAtCenter]="dxArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="dx-popover"
        [class.dx-popover-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="dxOverlayStyle"
        [@.disabled]="!!noAnimation?.dxNoAnimation"
        [dxNoAnimation]="noAnimation?.dxNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="dx-popover-content">
          <div class="dx-popover-arrow">
            <span class="dx-popover-arrow-content"></span>
          </div>
          <div class="dx-popover-inner" role="tooltip">
            <div>
            <div (click)="closePopOver()" *ngIf="dxHeader?.closeIcon" class="material-icons-outlined dx-popover-close-icon">close</div>
              <div class="dx-popover-title" *ngIf="dxTitle">
                <ng-container *dxStringTemplateOutlet="dxTitle;context: dxTitleContext">{{ dxTitle }}</ng-container>
              </div>
              <div class="dx-popover-inner-content">
                <ng-container *dxStringTemplateOutlet="dxContent;context: dxContentContext">{{ dxContent }}</ng-container>
              </div>
              <div class="dx-popover-button-align" [ngClass]="{'dx-popover-showBorder' : dxTitle}" *ngIf="dxActionButton?.primary || dxActionButton?.secondary">
                <button (click)="closePopOver()" *ngIf="dxActionButton?.secondary" class="dx-popover-secondary-btn m-2" >{{dxActionButton?.secondary?.title ? dxActionButton?.secondary?.title : 'close'}}</button>
                <button (click)="closePopOver();sendDetailData()" *ngIf="dxActionButton?.primary" 
                 class='dx-popover-dxBtn'>{{dxActionButton?.primary?.title}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class DxPopoverComponent extends DxToolTipComponent {
  override _prefix = 'dx-popover';
  dxTitleContext: Object | null = null;
  dxContentContext: Object | null = null;

  @Output() getDetailData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() noAnimation?: DxNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  get hasBackdrop(): boolean {
    return this.dxTrigger === 'click' ? this.dxBackdrop : false;
  }

  protected override isEmpty(): boolean {
    return isTooltipEmpty(this.dxTitle) && isTooltipEmpty(this.dxContent);
  }

  sendDetailData() {
    this.getDetailData.emit();
  }

  closePopOver() {
    this._visible = false;
  }
}
