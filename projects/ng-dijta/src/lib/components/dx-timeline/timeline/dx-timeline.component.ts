import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, Optional, QueryList, SimpleChange, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeLineCalenderBoxModel } from '../model/timeline-calender';
import { DxTimelineItemComponent } from '../timeline-item/dx-timeline-item.component';
import { DxTimelineService } from '../timeline.service';
import { DxTimelineMode, DxTimelinePosition } from '../typings';

@Component({
  selector: 'dx-timeline',
  templateUrl: './dx-timeline.component.html',
  styleUrls: ['../style/timeline.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [DxTimelineService],
  exportAs: 'DxTimeline',
})
export class DxTimelineComponent implements OnInit {

  @ContentChildren(DxTimelineItemComponent) listOfItems!: QueryList<DxTimelineItemComponent>;

  @Input() dxMode: DxTimelineMode = 'left';
  @Input() dxPending?: string | boolean | TemplateRef<void>;
  @Input() dxPendingDot?: string | TemplateRef<void>;
  @Input() dxReverse: boolean = false;
  @Input() outline: 'calender' | 'timeline-detail-view' | 'none' = 'none';

  isPendingBoolean: boolean = false;
  timelineItems: DxTimelineItemComponent[] = [];
  dir: Direction = 'ltr';
  hasLabelItem = false;

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private timelineService: DxTimelineService,
    @Optional() private directionality: Directionality
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { dxMode, dxReverse, dxPending } = changes;

    if (simpleChangeActivated(dxMode) || simpleChangeActivated(dxReverse)) {
      this.updateChildren();
    }

    if (dxPending) {
      this.isPendingBoolean = dxPending.currentValue === true;
    }
  }

  ngOnInit(): void {
    this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    this.updateChildren();

    this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateChildren();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfItems && this.listOfItems.length) {
      const length = this.listOfItems.length;
      let hasLabelItem = false;

      this.listOfItems.forEach((item: DxTimelineItemComponent, index: number) => {
        item.isLast = !this.dxReverse ? index === length - 1 : index === 0;
        item.position = getInferredTimelineItemPosition(index, this.dxMode);

        if (!hasLabelItem && item.dxLabel) {
          hasLabelItem = true;
        }

        item.detectChanges();
      });

      this.timelineItems = this.dxReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
      this.hasLabelItem = hasLabelItem;
    } else {
      this.timelineItems = [];
      this.hasLabelItem = false;
    }

    this.cdr.markForCheck();
  }

}
function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
  return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}

function getInferredTimelineItemPosition(index: number, mode: DxTimelineMode): DxTimelinePosition | undefined {
  return mode === 'custom'
    ? undefined
    : mode === 'left'
      ? 'left'
      : mode === 'right'
        ? 'right'
        : mode === 'alternate' && index % 2 === 0
          ? 'left'
          : 'right';
}