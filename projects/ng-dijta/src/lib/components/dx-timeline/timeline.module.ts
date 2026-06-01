import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { CoreUiModule } from '../../core';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxDirectiveModule } from '../../directive';
import { DxDatepickerModule } from '../dx-datepicker';
import { DxDatetimePickerModule } from '../dx-datetime-picker';
import { DxPopoverModule } from '../dx-popover';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { DxTimelineItemComponent } from './timeline-item/dx-timeline-item.component';
import { DxTimelineComponent } from './timeline/dx-timeline.component';
import { ActivityTimelineComponent } from './variant/activity-timeline/activity-timeline.component';
import { DxCalenderTimelineComponent } from './variant/dx-calender-timeline/dx-calender-timeline.component';
import { DxTimelineDetailViewComponent } from './variant/dx-timeline-detail-view/dx-timeline-detail-view.component';

@NgModule({
  declarations: [
    DxTimelineItemComponent,
    DxTimelineComponent,
    DxCalenderTimelineComponent,
    DxTimelineDetailViewComponent,
    ActivityTimelineComponent
  ],
  imports: [
    CommonModule,
    DxOutletModule,
    DxDatepickerModule,
    MatIconModule,
    DxDirectiveModule,
    DxPopoverModule,
    DxToolTipModule,
    CoreUiModule,
    DxDatetimePickerModule,
    TranslocoModule,
  ],
  exports: [
    DxTimelineItemComponent,
    DxTimelineComponent,
    DxCalenderTimelineComponent,
    DxTimelineDetailViewComponent,
    ActivityTimelineComponent
  ]
})
export class DxTimelineModule { }
