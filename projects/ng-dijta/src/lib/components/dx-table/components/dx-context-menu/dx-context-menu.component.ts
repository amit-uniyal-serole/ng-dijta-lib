import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import moment from 'moment';
import { TableContextMenuDataService } from '../../../../core/UI/service/table-context-menu-data/table-context-menu-data.service';
import { ContextMenuServiceSetting, ContextMenuSetting } from '../../interfaces/dx-additional.interface';

@Component({
  selector: 'dx-context-menu',
  templateUrl: './dx-context-menu.component.html',
  styleUrls: ['./dx-context-menu.component.scss'],
})
export class DxContextMenuComponent<T> {
  @Input() setting!: ContextMenuSetting;
  @Input() serviceSetting!: ContextMenuServiceSetting;
  isMenuOpen: Boolean = false;
  error!: string;
  errorState!: string;
  list!: any[];
  isBusy:boolean=false;
  tempServiceUrl:string | undefined;
  constructor(private readonly cd: ChangeDetectorRef,
    private readonly tableContextMenuDataService:TableContextMenuDataService) {}
  toggleMenu(): void {    
    this.isMenuOpen = !this.isMenuOpen;
    this.cd?.detectChanges();
    if(this.isMenuOpen){
      this.tempServiceUrl = '';
      this.dataUrlTrigger();
    }
  }

  dataUrlTrigger(): void {
    if (this.serviceSetting) {
      this.isBusy=true;
      this.tempServiceUrl = this.serviceSetting?.data ? this.serviceSetting.url : (this.serviceSetting.url + '' + this.setting?.id);
      this.tableContextMenuDataService.getTableContextMenuData({
        data: this.serviceSetting?.data, 
        url: this.tempServiceUrl, 
        method: this.serviceSetting?.method
      }).subscribe(
        (response:any) => {
            this.list = response.map((item) => {
              return {
                label: `${moment(item.dateFrom).format('DD/MM/YYYY h:mm')}` +' -  '+ `${moment(
                  item.dateTo
                ).format('DD/MM/YYYY h:mm')}`,
              };
            });
            if(this.list.length===0){
              this.error = "No additional class timings"
            }
          this.isBusy=false;
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
}
