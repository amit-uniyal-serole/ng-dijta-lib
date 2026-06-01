import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagComponent } from './tag.component';
import { TagsComponent } from './tags.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TagComponent,
    TagsComponent
  ],
  exports: [
    TagComponent,
    TagsComponent
  ]

})
export class TagsModule { }
