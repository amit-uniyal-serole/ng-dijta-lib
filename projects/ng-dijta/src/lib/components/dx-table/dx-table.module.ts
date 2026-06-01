import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { DxTagInputModule } from '../../components/dx-tag-input';
import { CoreUiModule } from '../../core/UI/core-ui.module';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxDirectiveModule } from '../../directive';
import { DxButtonModule } from '../dx-button/dx-button.module';
import { DxCardModule } from '../dx-card/dx-card.module';
import { DxCurrencyModule } from '../dx-currency';
import { DxDatepickerModule } from '../dx-datepicker';
import { DxEmptyModule } from '../dx-empty';
import { DxPopoverModule } from '../dx-popover';
import { DxSkeletonLoaderModule } from '../dx-skeleton-loader/dx-skeleton-loader.module';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { ImagePreviewModule } from '../image-preview';
import { DxActionComponent } from './components/dx-action/dx-action.component';
import { DxAvatarWrapperComponent } from './components/dx-avatar-wrapper/dx-avatar-wrapper.component';
import { DxBulkActionsComponent } from './components/dx-bulk-actions/dx-bulk-actions.component';
import { DxCellProgressBarComponent } from './components/dx-cell-progress-bar/dx-cell-progress-bar.component';
import { DxColumnSorterComponent } from './components/dx-column-sorter/dx-column-sorter.component';
import { DxContextMenuComponent } from './components/dx-context-menu/dx-context-menu.component';
import { DxDropdownComponent } from './components/dx-dropdown/dx-dropdown.component';
import { DxEditTableRowComponent } from './components/dx-edit-table-row/dx-edit-table-row.component';
import { DxFileCellComponent } from './components/dx-file-cell/dx-file-cell.component';
import { DxSVGCellComponent } from './components/dx-file-cell/dx-svg.component';
import { DxInlineDropdownComponent } from './components/dx-inline-dropdown/dx-inline-dropdown.component';
import { DxLinkComponent } from './components/dx-link/dx-link.component';
import { DxNumberCellComponent } from './components/dx-number-cell/dx-number-cell.component';
import { DxPaginatorComponent } from './components/dx-paginator/dx-paginator.component';
import { DxTableCheckboxComponent } from './components/dx-table-checkbox/dx-table-checkbox.component';
import { DxTableCurrencyComponent } from './components/dx-table-currency/dx-table-currency.component';
import { DxTableDateComponent } from './components/dx-table-date/dx-table-date.component';
import { DxTableFieldWrapperComponent } from './components/dx-table-field-wrapper/dx-table-field-wrapper.component';
import { DxTableHtmlComponent } from './components/dx-table-html/dx-table-html.component';
import { DxTableInputComponent } from './components/dx-table-input/dx-table-input.component';
import { DxTableLookupComponent } from './components/dx-table-lookup/dx-table-lookup.component';
import { DxTableMenuComponent } from './components/dx-table-menu/dx-table-menu.component';
import { DxTableMultiChipComponent } from './components/dx-table-multi-chip/dx-table-multi-chipcomponent';
import { DxTableSelectComponent } from './components/dx-table-select/dx-table-select.component';
import { DxTableServiceDataComponent } from './components/dx-table-service-data/dx-table-service-data.component';
import { DxTableSkeletonComponent } from './components/dx-table-skeleton/dx-table-skeleton.component';
import { DxTableSlideToggleComponent } from './components/dx-table-slide-toggle/dx-table-slide-toggle.component';
import { DxTableTextCellComponent } from './components/dx-table-text-cell/dx-table-text-cell.component';
import { DxTableTwoComponent } from './components/dx-table-two/dx-table-two.component';
import { DxTableComponent } from './components/dx-table/dx-table.component';
import { DxTagCellComponent } from './components/dx-tag-cell/dx-tag-cell.component';
import { MatTableResponsiveDirective } from './directive/mat-table-responsive.directive';
import { ResizeColumnDirective } from './resize-column.directive';
import { ModalModule } from '../modal';
import { FlexTableCellComponent } from './ngx-table/flex-table-cell/flex-table-cell.component';
import { FlexTableHeaderRowComponent } from './ngx-table/flex-table-header-row/flex-table-header-row.component';
import { FlexTableRowComponent } from './ngx-table/flex-table-row/flex-table-row.component';
import { FlexTableComponent } from './ngx-table/flex-table/flex-table.component';
import { FlexTableHeaderComponent } from './ngx-table/flex-table-header/flex-table-header.component';
import { FlexTableButtonCellComponent } from './ngx-table/flex-table-button-cell/flex-table-button-cell.component';
import { DxDefaultComponent } from './components/dx-default/dx-default.component';
import { AbilityModule } from '@casl/angular';
import { SelectModule } from '../select';
import { MatSelectModule } from '@angular/material/select';
import { DxTabsModule } from '../dx-tab/dx-tab.module';
import { DxFlatActionComponent } from './components/dx-flat-action/dx-flat-action.component';
import { InlineEditTableComponent } from './components/inline-edit-table/inline-edit-table.component';
import { DxPopupComponent } from '../dx-popup/dx-popup.component';
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    CoreUiModule,
    MatTooltipModule,
    ClipboardModule,
    DxSkeletonLoaderModule.forRoot(),
    DxCardModule,
    DxButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    DxCurrencyModule,
    DxDatepickerModule,
    DxPopoverModule,
    DxToolTipModule,
    DxTagInputModule,
    RouterModule,
    DxDirectiveModule,
    DxEmptyModule,
    DxOutletModule,
    ImagePreviewModule,
    TranslocoModule,
    ModalModule,
    AbilityModule,
    SelectModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    DxTabsModule,
    MatDialogModule
],
  declarations: [
    DxTableComponent,
    DxTableTextCellComponent,
    DxTableFieldWrapperComponent,
    DxTableCheckboxComponent,
    DxTableCurrencyComponent,
    DxTableDateComponent,
    DxActionComponent,
    DxPaginatorComponent,
    DxAvatarWrapperComponent,
    DxColumnSorterComponent,
    DxTableInputComponent,
    ResizeColumnDirective,
    DxTableSelectComponent,
    DxTableSkeletonComponent,
    DxTableMultiChipComponent,
    DxBulkActionsComponent,
    DxLinkComponent,
    DxContextMenuComponent,
    DxTableServiceDataComponent,
    DxTableSlideToggleComponent,
    DxTableMenuComponent,
    DxSVGCellComponent,
    DxFileCellComponent,
    MatTableResponsiveDirective,
    DxInlineDropdownComponent,
    DxEditTableRowComponent,
    DxTableTwoComponent,
    DxCellProgressBarComponent,
    DxNumberCellComponent,
    DxTagCellComponent,
    DxDropdownComponent,
    DxTableHtmlComponent,
    DxTableLookupComponent,

    // Flex Table
    FlexTableComponent,
    // Flex Table Rows
    FlexTableRowComponent,
    // FlexTableHoverRowComponent, // Hover
    FlexTableHeaderRowComponent,
    // // Flex Table Cells
    FlexTableCellComponent,
    FlexTableHeaderComponent,
    FlexTableButtonCellComponent,
    DxDefaultComponent,
    DxFlatActionComponent,
    InlineEditTableComponent,
    DxPopupComponent
  ],
  exports: [
    DxTableComponent,
    DxTableTextCellComponent,
    DxTableFieldWrapperComponent,
    DxTableCheckboxComponent,
    DxTableCurrencyComponent,
    DxTableDateComponent,
    DxActionComponent,
    DxPaginatorComponent,
    DxAvatarWrapperComponent,
    DxColumnSorterComponent,
    DxTableInputComponent,
    ResizeColumnDirective,
    DxTableSkeletonComponent,
    DxBulkActionsComponent,
    DxLinkComponent,
    DxTableServiceDataComponent,
    DxTableSlideToggleComponent,
    DxContextMenuComponent,
    DxTableMenuComponent,
    DxInlineDropdownComponent,
    DxEditTableRowComponent,
    DxTableTwoComponent,
    DxCellProgressBarComponent,
    DxNumberCellComponent,
    DxDropdownComponent,
    DxTableLookupComponent,
    //module export
    MatCheckboxModule,
    MatTooltipModule,
    MatTableResponsiveDirective,
    DxSVGCellComponent,
    DxFileCellComponent,
    DxTableHtmlComponent,

    // Flex Table
    FlexTableComponent,
    // Flex Table Rows
    FlexTableRowComponent,
    // FlexTableHoverRowComponent, // Hover
    FlexTableHeaderRowComponent,
    // // Flex Table Cells
    FlexTableCellComponent,
    FlexTableHeaderComponent,
    FlexTableButtonCellComponent,
    DxDefaultComponent,
    AbilityModule,
    DxFlatActionComponent,
    InlineEditTableComponent,
    DxPopupComponent
  ]
})
export class FlexTableModule { }
