import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardProfileSetting } from '../../model/dx-card.model';
import { Source } from '../../../dx-avatar/model/source';

@Component({
  selector: 'dx-card-profile',
  templateUrl: './dx-card-profile.component.html',
  styleUrls: ['./dx-card-profile.component.scss']
})
export class DxCardProfileComponent implements OnInit {
  @Input() profile!: CardProfileSetting;
  @Output()
  public emitFileDetails: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitFileDetail(event: any) {
    this.emitFileDetails.emit(event)
  }

}
