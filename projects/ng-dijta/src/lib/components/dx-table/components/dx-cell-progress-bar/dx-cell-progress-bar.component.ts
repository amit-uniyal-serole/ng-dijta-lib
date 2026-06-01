import { Component, Input } from '@angular/core';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { DxTableData } from '../../interfaces/dx-additional.interface';

@Component({
  selector: 'dx-cell-progress-bar',
  templateUrl: './dx-cell-progress-bar.component.html',
  styleUrls: ['./dx-cell-progress-bar.component.scss']
})
export class DxCellProgressBarComponent<T> {
  @Input() column!: DxTableColumn<T>;
  @Input() data!: string;
  @Input() source: DxTableData<T> | undefined;

}
