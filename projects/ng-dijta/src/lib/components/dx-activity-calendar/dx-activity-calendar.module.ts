import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxActivityCalendarComponent } from './dx-activity-calendar.component';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DxButtonModule } from '../dx-button';
import { DxToolTipModule } from '../dx-tooltip';



@NgModule({
  declarations: [
    DxActivityCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    PortalModule,
    DxButtonModule,
    DxToolTipModule
  ],
  exports:[DxActivityCalendarComponent]
})
export class DxActivityCalendarModule { }
