import { Component, Input } from '@angular/core';
import { MFooter } from '../model/monitoring-tile';

@Component({
  selector: 'dx-tile-footer',
  templateUrl: './tile-footer.component.html',
  styleUrls: ['./tile-footer.component.scss']
})
export class TileFooterComponent {
  @Input() footer!: MFooter | undefined;
  @Input() isContentHeightSmall: boolean = false;
}
