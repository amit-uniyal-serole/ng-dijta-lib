import { Component, Input } from '@angular/core';
import { MHeader } from '../model/monitoring-tile';

@Component({
  selector: 'dx-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss']
})
export class TileHeaderComponent {
  @Input() header?: MHeader;
  @Input() isContentHeightSmall: boolean = false;
}
