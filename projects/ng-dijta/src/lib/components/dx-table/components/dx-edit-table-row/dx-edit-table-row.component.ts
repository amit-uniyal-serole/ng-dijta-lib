import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dx-edit-table-row',
  templateUrl: './dx-edit-table-row.component.html',
  styleUrls: ['./dx-edit-table-row.component.scss'],
})
export class DxEditTableRowComponent implements OnInit {
  @Input() isEditable!: boolean;
  @Input() isRowDelete!: boolean;
  @Output() onClickEditRowAction:EventEmitter<string>=new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {}
  onClickRowBtn(type:string):void{
    // emit    
    if(type !=='delete'){
      this.isEditable = !this.isEditable;
    }    
    this.onClickEditRowAction.emit(type)
  }
}
