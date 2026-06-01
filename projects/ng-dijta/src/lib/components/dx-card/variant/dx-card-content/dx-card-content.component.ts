import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DxDetailsCardContent } from '../../model/dx-details-card.model';
@Component({
  selector: 'dx-card-content',
  templateUrl: './dx-card-content.component.html',
  styleUrls: ['./dx-card-content.component.scss']
})
export class DxCardContentComponent implements OnInit {
  @Input() content!: DxDetailsCardContent;
  @Input() enableTextCopy!: boolean;
  @Output() cardContentAction: EventEmitter<any> = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit(): void {
  }

  sendDetailData(content: any) {
    this.cardContentAction.emit(content);
  }

}
