import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CoreUiModule } from '../../core';
import { DxDualListboxComponent } from './dx-dual-listbox.component';


@NgModule({
  declarations: [
    DxDualListboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreUiModule,
    TranslocoModule,
  ],
  exports: [DxDualListboxComponent]
})
export class DxDualListboxModule { }
