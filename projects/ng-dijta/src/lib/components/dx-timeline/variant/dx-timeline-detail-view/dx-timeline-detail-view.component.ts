import { Component, Input } from '@angular/core';
import { TimelineDetailsView, TimelineDetailsViewSection } from '../../model/timeline-detail-view';
import { DateUtil } from '../../../../utils/date/date.util';
import moment from 'moment';
@Component({
  selector: 'dx-timeline-detail-view',
  templateUrl: './dx-timeline-detail-view.component.html',
  styleUrls: ['./dx-timeline-detail-view.component.css']
})
export class DxTimelineDetailViewComponent {
  @Input() data: TimelineDetailsView[] = [];

  getLabel(event: TimelineDetailsView): string {
    const today: moment.Moment = moment().endOf('day')
    const tomorrow: moment.Moment = moment().subtract(1, 'day').endOf('day')

    const convertToToday: string | undefined = DateUtil.format(today, 'YYYY-MM-DD');
    const convertToTomorrow: string | undefined = DateUtil.format(tomorrow, 'YYYY-MM-DD');

    const matchingDate: string | undefined = DateUtil.format(event.date, 'YYYY-MM-DD');

    if (matchingDate! === convertToToday!) return 'Today'

    if (matchingDate! === convertToTomorrow!) return 'Yesterday'

    return DateUtil.format(event.date, ' Do MMMM, YYYY') ?? ''
  }

  getChipStyles(section: TimelineDetailsViewSection) {
    return {
      'background-color': section?.tagColor,
      'color': section?.tagTextColor,
    }
  }
}
