import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dx-inline-edit-table',
  templateUrl: './inline-edit-table.component.html',
  styleUrls: ['./inline-edit-table.component.css']
})
export class InlineEditTableComponent<T>  {
  @ViewChild(MatTable) table!: MatTable<T>;
  @Input() dataSource: any[] = [];
  @Input() isEditRow:boolean = false;
  @Input() columns:  { columnDef: string; title: string; }[] = [];
  @Output() isEditingOpen = new EventEmitter<boolean>();
  editableRowIndex: number | null = null;
  editableRowBackup: any;
  originalRowData: any = {};
  @Output() dataChange = new EventEmitter<any[]>();
  editIndex: number | null = null;
  backupRow: any = null;
  editIndices: number[] = [];
backupRows: { [index: number]: any } = {};
  constructor() {}

  get displayedColumns(): string[] {
    return this.columns.map(col => col.columnDef);
  }
onEdit(index: number) {
  if (!this.editIndices.includes(index)) {
    this.editIndices.push(index);
    this.backupRows[index] = { ...this.dataSource[index] };
    this.isEditingOpen.emit(true);
  }
}

onSave(index: number) {
  this.editIndices = this.editIndices.filter(i => i !== index);
  delete this.backupRows[index];
  this.dataChange.emit(this.dataSource);
  this.isEditingOpen.emit(this.editIndices.length > 0);
}

onCancel(index: number) {
  this.dataSource[index] = { ...this.backupRows[index] };
  this.editIndices = this.editIndices.filter(i => i !== index);
  delete this.backupRows[index];
  this.isEditingOpen.emit(this.editIndices.length > 0);
}

isEditing(index: number): boolean {
  return this.editIndices.includes(index);
}
getInputType(value: any): string {
  if (typeof value === 'boolean') return 'checkbox';
  if (typeof value === 'number') return 'number';
  return 'text';
}
getDisplayValue(value: any, options: { keyTt: string, valueTt: string }[]): string {
  const matched = options?.find(option => option.keyTt === value);
  return matched?.valueTt || value;
}
isActionVisible(row: any, actionType: string): boolean {
  const action = row.actions?.find((a: any) => a.event === actionType);
  return action?.show === true;
}
}
