import { Component, Input, OnInit } from '@angular/core';
import { TileHeaderDto } from '../../interface/tile-header';

@Component({
  selector: 'dx-tile-wrapper',
  templateUrl: './dx-tile-wrapper.component.html',
  styleUrls: ['./dx-tile-wrapper.component.scss']
})
export class DxTileWrapperComponent implements OnInit {
  @Input() header: TileHeaderDto | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
