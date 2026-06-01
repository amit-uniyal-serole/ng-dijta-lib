import { Component, Input, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'dx-email-list-table-view',
  templateUrl: './email-list-table-view.component.html',
  styleUrls: ['./email-list-table-view.component.scss']
})
export class EmailListTableViewComponent implements OnInit {
  @Input() emailsList!: any;
  dataSource: any;
  displayedColumns: string[] = ['from', 'email', 'date'];
  ngOnInit(): void {
    this.dataSource = this.emailsList;
  }
 

}
