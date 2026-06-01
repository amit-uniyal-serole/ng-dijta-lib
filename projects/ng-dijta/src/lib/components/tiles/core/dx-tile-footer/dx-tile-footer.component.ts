import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TileFooterDto } from '../../interface/tile-footer';

@Component({
  selector: 'dx-tiles-footer',
  templateUrl: './dx-tile-footer.component.html',
  styleUrls: ['./dx-tile-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxTileFooterComponent implements OnInit {
  @Input() footer: TileFooterDto | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
