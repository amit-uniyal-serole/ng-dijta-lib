import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DxTableFilterSettings } from './model/dx-table-filter.model';

@Component({
  selector: 'dx-table-filter',
  templateUrl: './dx-table-filter.component.html',
  styleUrls: ['./dx-table-filter.component.scss'],
})
export class DxTableFilterComponent implements OnInit {
  filterForm!: FormGroup;
  title!: string;
  filterSettings!: DxTableFilterSettings[] | undefined;
  langaugeSelected: string = 'en';
  constructor(
    public dialogRef: MatDialogRef<DxTableFilterComponent>,
    private filterBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title = this.title ?? 'Search'
    this.changeDirection();
    this.filterForm = this.toGroup();
  }
  toGroup(): FormGroup {
    let group: any = {};
    this.filterSettings?.forEach((field: DxTableFilterSettings) => {
      group[field.name] = [field?.defaultValue ?? ''];
    });
    return this.filterBuilder.group(group);
  }
  onSearch(): void {
    this.dialogRef.close(this.filterForm.value);
  }
  onClear(): void {
    this.resetFilterForm();
    this.dialogRef.close(this.filterForm.value);
  }
  onClose(): void {
    this.dialogRef.close();
  }
  resetFilterForm(): void {
    this.filterForm?.reset()
  }
  changeDirection(): void {
    this.langaugeSelected = localStorage.getItem("language")!;
    const htmlTag = document.getElementsByTagName(
      'mat-dialog-container'
    )[0] as HTMLHtmlElement;
    htmlTag.style.direction = this.langaugeSelected === 'ar' ? 'rtl' : 'ltr';

    htmlTag.lang = this.langaugeSelected;
  }
}
