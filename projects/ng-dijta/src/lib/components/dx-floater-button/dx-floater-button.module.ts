import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFloaterButtonComponent } from './dx-floater-button.component';
import { TranslocoModule } from '@jsverse/transloco';



@NgModule({
  declarations: [
    DxFloaterButtonComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [DxFloaterButtonComponent]
})
export class DxFloaterButtonModule { }
