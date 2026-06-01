import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CoreUiModule } from '../../core';
import { DxDatepickerModule } from '../dx-datepicker';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { DxNotificationItemComponent } from './dx-notification-item/dx-notification-item.component';
import { DxNotificationsComponent } from './dx-notification.component';

@NgModule({
  declarations: [
    DxNotificationsComponent,
    DxNotificationItemComponent
  ],
  imports: [
    CommonModule,
    CoreUiModule,
    DxToolTipModule,
    HttpClientModule,
    DxDatepickerModule,
    FormsModule,
    TranslocoModule,
  ],
  exports: [
    DxNotificationsComponent,
    DxNotificationItemComponent,
    HttpClientModule
  ]
})
export class DxNotificationModule { }
