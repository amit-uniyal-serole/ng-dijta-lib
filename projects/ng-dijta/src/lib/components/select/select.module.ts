import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { WindowRefModule } from '../../core/window-ref';
import { TagsModule } from '../dx-tag';
import { LoadingModule } from '../loading';
import { LazyLoadModule } from '../../directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
    LoadingModule,
    LazyLoadModule,
    WindowRefModule,
    TagsModule,
  ],
  exports: [SelectComponent],
  declarations: [SelectComponent],
})
export class SelectModule { }
