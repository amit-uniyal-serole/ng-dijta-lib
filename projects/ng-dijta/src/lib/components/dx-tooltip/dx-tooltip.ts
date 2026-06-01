import { Directionality } from '@angular/cdk/bidi';
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
    Optional,
    Output,
    Renderer2,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {
    isTooltipEmpty,
    DxTooltipBaseDirective,
    DxTooltipTrigger,
    PropertyMapping,
    DxTooltipBaseComponent
} from './base';
import { DxNoAnimationDirective } from '../../core/no-animation/dx-no-animation.directive';
import { BooleanInput } from '@angular/cdk/coercion';
import { NgStyleInterface } from '../../core/outlet/type/ng-class';
import { InputBoolean } from '../../utils/convert';
import { DxTSType } from '../../utils/types/template';
import { zoomBigMotion } from '../../core/animation/zoom';
import { DxPresetColor, isPresetColor } from '../../core/color/color';

@Directive({
    selector: '[dx-tooltip]',
    exportAs: 'dxTooltip',
    host: {
        '[class.dx-tooltip-open]': 'visible'
    }
})
export class DxTooltipDirective extends DxTooltipBaseDirective {
    static ngAcceptInputType_dxTooltipArrowPointAtCenter: BooleanInput;

    @Input('dxTooltipTitle') override title?: DxTSType | null;
    @Input('dxTooltipTitleContext') titleContext?: Object | null = null;
    @Input('dx-tooltip') override directiveTitle?: DxTSType | null;
    @Input('dxTooltipTrigger') override trigger?: DxTooltipTrigger = 'hover';
    @Input('dxTooltipPlacement') override placement?: string | string[] = 'top';
    @Input('dxTooltipOrigin') override origin?: ElementRef<HTMLElement>;
    @Input('dxTooltipVisible') override visible?: boolean;
    @Input('dxTooltipMouseEnterDelay') override mouseEnterDelay?: number;
    @Input('dxTooltipMouseLeaveDelay') override mouseLeaveDelay?: number;
    @Input('dxTooltipOverlayClassName') override overlayClassName?: string;
    @Input('dxTooltipOverlayStyle') override overlayStyle?: NgStyleInterface;
    @Input('dxTooltipArrowPointAtCenter') @InputBoolean() override arrowPointAtCenter?: boolean;
    @Input() dxTooltipColor?: string;

    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('dxTooltipVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();

    override componentRef: ComponentRef<DxToolTipComponent> = this.hostView.createComponent(DxToolTipComponent);

    constructor(
        elementRef: ElementRef,
        hostView: ViewContainerRef,
        resolver: ComponentFactoryResolver,
        renderer: Renderer2,
        @Host() @Optional() noAnimation?: DxNoAnimationDirective
    ) {

        super(elementRef, hostView, resolver, renderer, noAnimation);
    }

    protected override getProxyPropertyMap(): PropertyMapping {
        return {
            ...super.getProxyPropertyMap(),
            dxTooltipColor: ['dxColor', () => this.dxTooltipColor],
            dxTooltipTitleContext: ['dxTitleContext', () => this.titleContext]
        };
    }
}

@Component({
    selector: 'dx-tooltip',
    exportAs: 'dxTooltipComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [zoomBigMotion],
    template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      dxConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      [dxArrowPointAtCenter]="dxArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="dx-tooltip"
        [class.dx-tooltip-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="dxOverlayStyle"
        [@.disabled]="!!noAnimation?.dxNoAnimation"
        [dxNoAnimation]="noAnimation?.dxNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="dx-tooltip-content">
          <div class="dx-tooltip-arrow">
            <span class="dx-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="dx-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *dxStringTemplateOutlet="dxTitle; context: dxTitleContext">
                <div [innerHTML]="dxTitle | dxsafe: 'html'"></div>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
    preserveWhitespaces: false
})
export class DxToolTipComponent extends DxTooltipBaseComponent {
    override dxTitle: DxTSType | null = null;
    dxTitleContext: Object | null = null;

    dxColor?: string | DxPresetColor;

    _contentStyleMap: NgStyleInterface = {};

    constructor(
        cdr: ChangeDetectorRef,
        @Optional() directionality: Directionality,
        @Host() @Optional() noAnimation?: DxNoAnimationDirective
    ) {
        super(cdr, directionality, noAnimation);
    }

    protected isEmpty(): boolean {
        return isTooltipEmpty(this.dxTitle);
    }

    protected override updateStyles(): void {
        const isColorPreset = this.dxColor && isPresetColor(this.dxColor);

        this._classMap = {
            [this.dxOverlayClassName]: true,
            [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
            [`${this._prefix}-${this.dxColor}`]: isColorPreset
        };

        this._contentStyleMap = {
            backgroundColor: !!this.dxColor && !isColorPreset ? this.dxColor : null
        };
    }
}
