import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TileHeaderDto } from '../../interface/tile-header';

@Component({
  selector: 'dx-tiles-header',
  templateUrl: './dx-tile-header.component.html',
  styleUrls: ['./dx-tile-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxTileHeaderComponent implements OnInit {
  @Input() header: TileHeaderDto | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
