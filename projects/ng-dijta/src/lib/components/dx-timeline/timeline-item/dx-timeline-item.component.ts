import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { DxTimelineService } from '../timeline.service';
import { DxTimelineItemColor, DxTimelinePosition, TimelineTimeDefaultColors } from '../typings';
import { TimeLineCalenderBoxModel } from '../model/timeline-calender';

function isDefaultColor(color?: string): boolean {
  return TimelineTimeDefaultColors.findIndex(i => i === color) !== -1;
}
@Component({
  selector: 'dx-timeline-item, [dx-timeline-item]',
  templateUrl: './dx-timeline-item.component.html',
  styleUrls: ['../style/timeline.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'dxTimelineItem',
})
export class DxTimelineItemComponent {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;

  @Input() dxPosition?: DxTimelinePosition;
  @Input() dxColor: DxTimelineItemColor | string = 'blue';
  @Input() dxDot?: string | TemplateRef<void>;
  @Input() dxCustom?: string | TemplateRef<void>;
  @Input() dxLabel?: string | TemplateRef<void>;
  @Input() calenderData!: TimeLineCalenderBoxModel;
  @Input() timelineItemTileLabel: string = '';
  @Input() backgroundNone: boolean = false;

  isLast = false;
  borderColor: string | null = null;
  position?: DxTimelinePosition;

  constructor(private cdr: ChangeDetectorRef, private timelineService: DxTimelineService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.timelineService.markForCheck();
    if (changes.dxColor) {
      this.updateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private updateCustomColor(): void {
    this.borderColor = isDefaultColor(this.dxColor) ? null : this.dxColor;
  }
}
