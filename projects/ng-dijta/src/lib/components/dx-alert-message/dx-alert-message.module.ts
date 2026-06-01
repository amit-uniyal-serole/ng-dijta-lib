import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DxAlertMessageComponent } from './dx-alert-message.component';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
  declarations: [
    DxAlertMessageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule
  ],
  exports: [DxAlertMessageComponent]
})
export class DxAlertMessageModule { }
