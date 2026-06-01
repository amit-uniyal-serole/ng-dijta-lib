import { NgModule } from '@angular/core';
import { OverlayContainerRef } from './overlay-container-ref';
import { WindowRefModule } from '../window-ref';
@NgModule({
  imports: [WindowRefModule],
  exports: [],
  declarations: [],
  providers: [
    OverlayContainerRef,
  ],
})
export class OverlayContainerModule {
}
