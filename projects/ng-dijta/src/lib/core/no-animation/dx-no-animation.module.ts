import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxNoAnimationDirective } from './dx-no-animation.directive';

@NgModule({
  declarations: [DxNoAnimationDirective],
  exports: [DxNoAnimationDirective],
  imports: [CommonModule]
})
export class DxNoAnimationModule { }
