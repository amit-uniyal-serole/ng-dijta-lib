import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerModule, ToastNoAnimationModule, ToastrModule } from './public-api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
  ]
})
export class DxToastrModule { }
