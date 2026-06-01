import { Component, Input } from '@angular/core';
import { tile } from '../dx-basic-tile/basic-tile.model';

@Component({
  selector: 'dx-footer',
  templateUrl: './dx-footer.component.html',
  styleUrls: ['./dx-footer.component.scss'],
})
export class DxFooterComponent {
  @Input() tile!: tile;
}
