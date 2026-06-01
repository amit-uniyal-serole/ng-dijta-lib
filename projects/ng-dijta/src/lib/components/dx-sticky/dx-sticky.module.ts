import { NgModule } from '@angular/core';
import { DxStickyComponent } from './dx-sticky.component';
import { WindowRefModule } from '../../core/window-ref/window-ref.module';

@NgModule({
  imports: [
    WindowRefModule
  ],
  declarations: [
    DxStickyComponent
  ],
  exports: [
    DxStickyComponent,
  ],
})

export class DxStickyModule { }
