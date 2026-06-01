import { Component, Input, ElementRef, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { TableDropdown, TableKeyValueModel } from '../../interfaces/dx-multi-value.interface';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { FlexTableCellComponent } from '../../ngx-table/flex-table-cell/flex-table-cell.component';
import { MatDialog } from '@angular/material/dialog';
import { DxPopupComponent } from '../../../dx-popup/dx-popup.component';

@Component({
  selector: 'dx-dropdown',
  templateUrl: './dx-dropdown.component.html',
  styleUrls: ['./dx-dropdown.component.scss'],
})
export class DxDropdownComponent<T> extends FlexTableCellComponent<TableDropdown<T>> implements AfterViewInit {
  @Input() data!: TableDropdown<T>;
  @Input() column!: DxTableColumn<T>;
  dropdown: TableKeyValueModel<T>[] = [];
  displayDropdown: TableKeyValueModel<T>[] = [];
  remainingDropdown: TableKeyValueModel<T>[] = [];
  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly cdRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) { 
    super()
  }
  ngAfterViewInit(): void {
    if (this.data && (this.data as Object).hasOwnProperty(this.column.field as string)) {
      this.dropdown = this.data[this.column.field] ?? [];
      this.displayDropdown = this.dropdown.filter((_item, index) => index < 3);
      this.remainingDropdown = this.dropdown.filter((_item, index) => index >= 3);
    }
    this.cdRef.detectChanges();
    if (this.dropdown.length === 1 && this.column.type === 'filled_dropdown') {
      const parentCell = this.elementRef.nativeElement.closest('.mat-cell');
      this.renderer.setStyle(parentCell, 'background-color', this.dropdown[0].color ?? '#fff');
      if (this.dropdown[0].color) {
        const color = this.getContrastColor(this.dropdown[0].color)
        this.renderer.setStyle(parentCell, 'color', color ?? '#000');
      }
    }
  }

  getContrastColor(color: string): string {
    // Convert color to RGB format
    const hex: string = color.replace("#", "");
    const r: number = parseInt(hex.substr(0, 2), 16);
    const g: number = parseInt(hex.substr(2, 2), 16);
    const b: number = parseInt(hex.substr(4, 2), 16);

    // Calculate perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine contrast color
    return brightness > 128 ? "#000000" : "#ffffff";
  }

  clickPopup(popupData): void{
    const popupDataWithShowPopup = popupData.find(popup => popup?.popupTitle && popup?.popupDesc);
    const dialogRef = this.dialog.open(DxPopupComponent, {
      width: '50%',
      panelClass: 'lookout-modal-box',
    });
    dialogRef.componentInstance.title = popupDataWithShowPopup?.popupTitle;
    dialogRef.componentInstance.description = popupDataWithShowPopup?.popupDesc; 
  }

  get hasPopupOption(): boolean {
    return this.displayDropdown?.some(
      option => option?.popupTitle && option?.popupDesc
    );
  }

}
