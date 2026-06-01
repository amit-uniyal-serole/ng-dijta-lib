import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { CoreUiModule } from '../../core';
import { DxDualListboxComponent } from './dx-dual-listbox.component';
import { DxInputModule } from '../dx-input/dx-input.module';
import { MatListModule } from '@angular/material/list';
import { DxCardModule } from '../dx-card';
import { DxDirectiveModule } from '../../directive';
@NgModule({
  declarations: [
    DxDualListboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreUiModule,
    DxInputModule,
    MatListModule,
    DxCardModule,
    TranslocoModule,
    DxDirectiveModule
  ],
  exports: [DxDualListboxComponent]
})
export class DxDualListboxModule { }
