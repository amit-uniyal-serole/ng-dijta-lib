import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { CoreUiModule } from '../../core';
import { DxDrawerModule } from '../dx-drawer';
import { DxRadioButtonModule } from '../dx-radio-button';
import { DxHeaderComponent } from './dx-header.component';
import { DxProfileComponent } from './dx-profile/dx-profile.component';
import { DxNotificationComponent } from './notification.component';
import { DxHeaderService } from './service/dx-header.service';
import { DxToolTipModule } from '../dx-tooltip';
import { DxDirectiveModule } from '../../directive';

@NgModule({
  declarations: [
    DxHeaderComponent,
    DxNotificationComponent,
    DxProfileComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    CoreUiModule,
    MatTabsModule,
    MatSlideToggleModule,
    DxDrawerModule,
    DxRadioButtonModule,
    TranslocoModule,
    DxToolTipModule,
    DxDirectiveModule
  ],
  providers: [
    DxHeaderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DxHeaderComponent, DxProfileComponent, DxNotificationComponent]
})
export class DxHeaderModule { }
