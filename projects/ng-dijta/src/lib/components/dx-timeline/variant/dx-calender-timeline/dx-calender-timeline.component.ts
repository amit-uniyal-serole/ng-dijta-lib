import { Component, Input, OnChanges } from '@angular/core';
import { SORT_TIMELINE_BY, TimeLineCalenderModel } from '../../model/timeline-calender';
import moment from 'moment';
import { DateUtil } from '../../../../utils/date/date.util';
import { DxDateService } from '../../../dx-datepicker';
@Component({
  selector: 'dx-calender-timeline',
  templateUrl: './dx-calender-timeline.component.html',
})
export class DxCalenderTimelineComponent implements OnChanges {
  @Input() sortTimeLineBy!: SORT_TIMELINE_BY;
  @Input() data: TimeLineCalenderModel[] = [];
  constructor(
    private readonly dxDateService: DxDateService
  ) { }
  ngOnChanges(): void {
    this.data = this.data.map((item: TimeLineCalenderModel, index: number) => {
      let isSameDate: boolean = false;
      let isParentSameDate: boolean = false
      const previousIndex: boolean = index > 0;
      const lastIndex: boolean = index !== this.data.length;
      isParentSameDate = lastIndex ? moment(this.data[index + 1]?.date).isSame(moment(item.date)) : false;
      isSameDate = previousIndex ? moment(this.data[index - 1]?.date).isSame(moment(item.date)) : false;
      isParentSameDate = isParentSameDate && !isSameDate;
      return {
        ...item,
        box: {
          ...item.box,
          isSameDate: isSameDate,
          isParent: isParentSameDate,
          month: this.dxDateService.getDateToFormat(item.date, 'MMM'),
          date: this.dxDateService.getDate(item.date),
          active: DateUtil.format(item.date, 'YYYY-MM-DD') === DateUtil.format(new Date(), 'YYYY-MM-DD')
        }
      }
    })
    if (this.sortTimeLineBy === 'older') {
      this.data = this.data?.sort((a, b) => new Date(a?.date!).getTime() - new Date(b?.date!).getTime());
    } else {
      this.data = this.data?.sort((a, b) => new Date(b?.date!).getTime() - new Date(a?.date!).getTime());
    }

  }
}
