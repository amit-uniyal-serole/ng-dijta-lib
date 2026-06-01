import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClockComponent } from './clock/clock.component';
import { DxTimePickerInputComponent } from './dx-time-picker-input/dx-time-picker-input.component';
import { MatTimepickerComponentDialogComponent } from './timepicker-dialog/timepicker-dialog.component';
import { MatTimepickerDirective } from './timepicker.directive';

@NgModule({
    declarations: [
        ClockComponent,
        MatTimepickerDirective,
        MatTimepickerComponentDialogComponent,
        DxTimePickerInputComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule
    ],
    exports: [
        MatTimepickerDirective,
        DxTimePickerInputComponent
    ]
})
export class DxTimepickerModule { }
