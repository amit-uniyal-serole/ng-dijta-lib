import { Platform } from '@angular/cdk/platform';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzBreakpointKey, NzBreakpointService, siderResponsiveMap } from '../../utils/types/breakpoint';
import { BooleanInput } from '../../utils/types/convert-input';
import { inNextTick, InputBoolean, toCssPixel } from '../../utils/types/tick';

@Component({
    selector: 'dx-layout-sider',
    exportAs: 'dxLayoutSider',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="dx-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
    host: {
        class: 'dx-layout-sider',
        '[class.dx-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
        '[class.dx-layout-sider-light]': `nzTheme === 'light'`,
        '[class.dx-layout-sider-dark]': `nzTheme === 'dark'`,
        '[class.dx-layout-sider-collapsed]': `nzCollapsed`,
        '[class.dx-layout-sider-has-trigger]': `nzCollapsible && nzTrigger !== null`,
        '[style.flex]': 'flexSetting',
        '[style.maxWidth]': 'widthSetting',
        '[style.minWidth]': 'widthSetting',
        '[style.width]': 'widthSetting'
    }
})
export class DxLayoutSiderComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
    static ngAcceptInputType_nzReverseArrow: BooleanInput;
    static ngAcceptInputType_nzCollapsible: BooleanInput;
    static ngAcceptInputType_nzCollapsed: BooleanInput;

    private destroy$ = new Subject();
    //   @ContentChild(NzMenuDirective) nzMenuDirective: NzMenuDirective | null = null;
    @Output() readonly nzCollapsedChange = new EventEmitter();
    @Input() nzWidth: string | number = 200;
    @Input() nzTheme: 'light' | 'dark' = 'dark';
    @Input() nzCollapsedWidth = 80;
    @Input() nzBreakpoint: NzBreakpointKey | null = null;
    @Input() nzZeroTrigger: TemplateRef<void> | null = null;
    @Input() nzTrigger: TemplateRef<void> | undefined | null = undefined;
    @Input() @InputBoolean() nzReverseArrow = false;
    @Input() @InputBoolean() nzCollapsible = false;
    @Input() @InputBoolean() nzCollapsed = false;
    matchBreakPoint = false;
    flexSetting: string | null = null;
    widthSetting: string | null = null;

    updateStyleMap(): void {
        this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
        this.flexSetting = `0 0 ${this.widthSetting}`;
        this.cdr.markForCheck();
    }

    updateMenuInlineCollapsed(): void {
        // if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
        //   this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        // }
    }

    setCollapsed(collapsed: boolean): void {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    }

    constructor(
        private platform: Platform,
        private cdr: ChangeDetectorRef,
        private breakpointService: NzBreakpointService
    ) { }

    ngOnInit(): void {
        this.updateStyleMap();

        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(map => {
                    const breakpoint = this.nzBreakpoint;
                    if (breakpoint) {
                        inNextTick().subscribe(() => {
                            this.matchBreakPoint = !map[breakpoint];
                            this.setCollapsed(this.matchBreakPoint);
                            this.cdr.markForCheck();
                        });
                    }
                });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    }

    ngAfterContentInit(): void {
        this.updateMenuInlineCollapsed();
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}