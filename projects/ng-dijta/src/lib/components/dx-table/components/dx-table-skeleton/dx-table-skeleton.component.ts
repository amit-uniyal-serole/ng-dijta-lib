import { Component, Input, OnInit } from '@angular/core';
import { Skeleton, SkeletonLoaderModel } from '../../../dx-skeleton-loader';
@Component({
  selector: 'dx-table-skeleton',
  templateUrl: './dx-table-skeleton.component.html',
  styleUrls: ['./dx-table-skeleton.component.scss']
})
export class DxTableSkeletonComponent implements OnInit {
  @Input() loaderPageSize = 5;
  @Input() isAvatar: boolean = false
  @Input() isMultiCheckbox: boolean = false;
  @Input() isRowArrange: boolean = false;
  numberOfRecords: number[] = []
  avatarTheme: SkeletonLoaderModel = Skeleton.Avatar;
  checkBox: SkeletonLoaderModel = Skeleton.tableCheckBox;
  lineTheme: SkeletonLoaderModel = Skeleton.line
  rowSelectLoader: SkeletonLoaderModel = Skeleton.verticalLine;
  constructor() { }

  ngOnInit(): void {
    this.getLoaderSize()
  }
  getLoaderSize() {
    for (let i = 1; i <= this.loaderPageSize; i++) {
      this.numberOfRecords.push(i)
    }
  }

}
