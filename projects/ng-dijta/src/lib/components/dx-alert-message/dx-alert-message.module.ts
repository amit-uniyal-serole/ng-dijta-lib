import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAlertMessageComponent } from './dx-alert-message.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [
    DxAlertMessageComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [DxAlertMessageComponent]
})
export class DxAlertMessageModule { }
