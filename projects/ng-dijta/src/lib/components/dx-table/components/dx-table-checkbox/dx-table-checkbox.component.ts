import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dx-table-checkbox',
  templateUrl: './dx-table-checkbox.component.html',
  styleUrls: ['./dx-table-checkbox.component.css']
  
})
export class DxTableCheckboxComponent<T> {
  @Input() data!: T;
  @Output() readonly checkboxChanged: EventEmitter<T> = new EventEmitter<T>();
}
