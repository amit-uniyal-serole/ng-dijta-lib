import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { CoreUiModule } from '../../core';
import { DxDatepickerModule } from '../dx-datepicker';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { DxNotificationItemComponent } from './dx-notification-item/dx-notification-item.component';
import { DxNotificationsComponent } from './dx-notification.component';
import { MatIconModule } from '@angular/material/icon';
import { DxDirectiveModule } from '../../directive';

@NgModule({
    declarations: [
        DxNotificationsComponent,
        DxNotificationItemComponent
    ],
    exports: [
        DxNotificationsComponent,
        DxNotificationItemComponent,
    ], imports: [CommonModule,
        CoreUiModule,
        DxToolTipModule,
        DxDatepickerModule,
        FormsModule,
        TranslocoModule,
        MatIconModule,
        DxDirectiveModule
    ], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class DxNotificationModule { }
