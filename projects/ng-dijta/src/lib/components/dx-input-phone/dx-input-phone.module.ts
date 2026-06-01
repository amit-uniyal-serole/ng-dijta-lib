import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxInputPhoneComponent } from './dx-input-phone.component';
import { PhoneContactComponent } from './phone-contact/phone-contact.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SearchPipe } from './phone-contact/search.pipe';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DxInputPhoneComponent, PhoneContactComponent, SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DxInputPhoneComponent, PhoneContactComponent]
})
export class DxInputPhoneModule { }
