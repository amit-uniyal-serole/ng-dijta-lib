import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tile } from './basic-tile.model';

@Component({
  selector: 'dx-basic-tile',
  templateUrl: './dx-basic-tile.component.html',
  styleUrls: ['./dx-basic-tile.component.scss'],
})
export class DxBasicTileComponent {
  @Input() tile!: tile;
  @Output() tileClick: EventEmitter<tile> = new EventEmitter<tile>();
  onBtnClick(tile: tile): void {
    this.tileClick.emit(tile);
  }
}
