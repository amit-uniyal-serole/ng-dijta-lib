import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dx-basic-popover-header',
  templateUrl: './basic-popover-header.component.html',
  styleUrls: ['./basic-popover-header.component.scss']
})
export class BasicPopoverHeaderComponent implements OnInit {

  @Input('popoverHeaderData') popoverHeaderData;

  @Output() openInNew: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  sendData() {
    this.openInNew.emit()
  }

}
