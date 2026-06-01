import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { ActivityTimeLine, TimelineItem } from '../../model/acitivity-timeline';
import { uniqBy } from 'lodash';
import { DxDateService } from '../../../dx-datepicker';
import { NgDxAvatarSettings } from '../../../dx-avatar/model/avatar';
@Component({
  selector: 'dx-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityTimelineComponent implements OnChanges {
  @Input() data: TimelineItem[] = [];
  @Input() uniqueBy: string = 'displayDate';
  @Input() timelinesItems: ActivityTimeLine[] = [];
  @Output() onScrollEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() height: string = '400px';
  avatarSettings: NgDxAvatarSettings = {
    size: 30,
    initialsSize: 2
  };
  constructor(private readonly dxDateService: DxDateService) { }
  ngOnChanges(): void {
    this.timelinesItems = this.transformToGrouping(this.data);
  }
  onScroll() {
    this.onScrollEvent.emit();
  }

  private transformToGrouping(src: TimelineItem[]): ActivityTimeLine[] {
    // Find All Unique values by uniqueBy and arrange timeline as group
    return uniqBy(src, this.uniqueBy).map((group: TimelineItem) => {

      return {
        label: group.displayDate,
        timelines: src.filter((item: TimelineItem) => item[this.uniqueBy] === group[this.uniqueBy])
          ?.sort((timelineSource_1, timelineSource_2) => new Date(timelineSource_2.toolTipDate!).getTime() - new Date(timelineSource_1.toolTipDate!).getTime()).map((timeline: TimelineItem) => {
            return {
              ...timeline,
              activityDateTime: this.dxDateService.getTimeToNow(timeline?.toolTipDate),
              displayTime: this.dxDateService.getDateToFormat(timeline?.toolTipDate, 'hh:mm a')
            }
          })
      }
    })?.sort((timelineSource_1: ActivityTimeLine, timelineSource_2: ActivityTimeLine) => new Date(timelineSource_2.label!).getTime() - new Date(timelineSource_1.label!).getTime())
  }
}
