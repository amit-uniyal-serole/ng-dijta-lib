import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Tag } from '../../../dx-tag-input/tag';

@Component({
  selector: 'dx-tag-cell',
  templateUrl: './dx-tag-cell.component.html',
  styleUrls: ['./dx-tag-cell.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DxTagCellComponent implements OnInit {
  @Input() data: Tag[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
