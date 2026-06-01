import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dx-basic-popover',
  templateUrl: './basic-popover-content.component.html',
  styleUrls: ['./basic-popover-content.component.scss']
})
export class BasicPopoverContentComponent implements OnInit {

  @Input('popoverContentData') popoverContentData;
  @Input() popoverConfigName!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
