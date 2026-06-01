import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DxButtonModule } from '../dx-button';
import { DxIconSelectionPopupComponent } from './dx-icon-selection-popup.component';
import { DxInputModule } from '../dx-input';
import { DxSelectModule } from '../dx-select';
import { FormsModule } from '@angular/forms';
import { CoreUiModule } from '../../core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconService } from './service/icon.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { DxAutocompleteSelectModule } from '../dx-autocomplete-select';
import { DxEmptyModule } from '../dx-empty';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DxSkeletonLoaderModule } from '../dx-skeleton-loader';
@NgModule({
    declarations: [DxIconSelectionPopupComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        DxButtonModule,
        DxSelectModule,
        DxInputModule,
        FormsModule,
        CoreUiModule,
        MatTooltipModule,
        MatIconModule,
        TranslocoModule,
        DxAutocompleteSelectModule,
        DxEmptyModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        DxSkeletonLoaderModule
    ],
    providers: [IconService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DxIconSelectionPopupModule { }
