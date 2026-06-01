
import { NgModule } from '@angular/core';

import { DxConnectedOverlayDirective } from './dx-connected-overlay';

@NgModule({
  declarations: [DxConnectedOverlayDirective],
  exports: [DxConnectedOverlayDirective]
})
export class DxOverlayModule { }
