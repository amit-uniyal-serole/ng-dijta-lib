import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TableCellDataService } from '../../../../core/UI/service/table-cell-data/table-cell-data.service';
import { Skeleton, SkeletonLoaderModel } from '../../../dx-skeleton-loader';
import { DxTableColumn } from '../../interfaces/dx-table.interface';

@Component({
  selector: 'dx-table-service-data',
  templateUrl: './dx-table-service-data.component.html',
  styleUrls: ['./dx-table-service-data.component.scss'],
})
export class DxTableServiceDataComponent<T> implements OnInit {
  @Input() column!: DxTableColumn<T>;
  @Input() data!: string;
  error!: string;
  errorState!: string;
  text!: string;
  copyText: string='Click to copy';
  isBusy:boolean=false;
  SquareBox: SkeletonLoaderModel = Skeleton.SquareBox
  constructor(private readonly tableCellDataService:TableCellDataService) {}

  ngOnInit(): void {
    this.dataUrlTrigger();
  }
  dataUrlTrigger(): void {
    if (this.data) {
      this.isBusy=true      
      this.tableCellDataService.getTableCellData(this.data).subscribe(
        (_x:any) => {
         this.text=_x                  
         this.isBusy=false
        },
        (error: HttpErrorResponse) => {
          this.error = error?.message; 
          this.isBusy=false                 
        },()=>{
          this.isBusy=false
        }
      );
    }
  }


  onClickCopy(): void {
    this.copyText = 'Copied';
  }
  changeText(): void {
    this.copyText = 'Click to copy';
  }
}
