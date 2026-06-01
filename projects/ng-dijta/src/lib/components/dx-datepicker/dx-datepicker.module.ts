import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDatepickerComponent } from './dx-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material/core';
import { DxDirectiveModule } from '../../directive';
import { DxDatePipe } from './pipe/dxDate.pipe';
import { DxDateService } from './service/dx-date.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [DxDatepickerComponent, DxDatePipe],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    DxDirectiveModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTooltipModule,
    TranslocoModule
  ],
  providers: [
    DxDateService,
    DxDatePipe,
  ],
  exports: [DxDatepickerComponent, DxDatePipe, MatMomentDateModule],
})
export class DxDatepickerModule { }
