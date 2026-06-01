import { Component, Input } from '@angular/core';
import { CardDateSettings } from '../../model/dx-details-card.model';


@Component({
  selector: 'dx-card-date',
  templateUrl: './dx-card-date.component.html',
  styleUrls: ['./dx-card-date.component.css']
})
export class DxCardDateComponent  {
  static readonly DEFAULT_TEXT: string = '-';
  @Input()
  data!: Date | string;

  @Input()
  defaultText: string = DxCardDateComponent.DEFAULT_TEXT;
  
  @Input()
  setting?: CardDateSettings;
}
