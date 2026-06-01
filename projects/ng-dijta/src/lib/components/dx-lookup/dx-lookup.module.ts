import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxLookupComponent } from './dx-lookup.component';
import { LookupModalModule } from './lookup-modal/lookup-modal.module';

@NgModule({
  declarations: [
    DxLookupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    LookupModalModule
  ],
  exports: [DxLookupComponent, LookupModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DxLookupModule { }
