import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, filter, first } from 'rxjs/operators';
import { KeyValueModel } from '../../core';
import { PaginationRequest } from '../dx-config-table';
import { Icons } from './model/icon.interface';
import { IconService } from './service/icon.service';
import { sortBy, unionBy } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { Skeleton, SkeletonLoaderModel } from '../dx-skeleton-loader';
@Component({
  selector: 'dx-icon-selection-popup',
  templateUrl: './dx-icon-selection-popup.component.html',
  styleUrls: ['./dx-icon-selection-popup.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideInOut', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class DxIconSelectionPopupComponent implements OnInit {
  title: string = 'Select Icon';
  iconCategoryList: KeyValueModel[] = [];
  iconList: Icons[] = [];
  listPaginationRequest: PaginationRequest = {
    sortBy: 'pkId',
    sortOrder: 'asc',
    pageNo: 0,
    pageSize: 50
  };
  pageSizeOptions: number[] = [5, 10, 25, 100];
  icons: any;
  selectedCategory: string | undefined;
  isBusy = false;
  isCategoryError = false;
  search: string = '';
  showMore: boolean = false;
  loaderArray = Array(12).fill('')
  constructor(
    public dialogRef: MatDialogRef<DxIconSelectionPopupComponent>,
    private readonly iconService: IconService
  ) { }

  chipSkeleton: SkeletonLoaderModel = {
    width: '9rem',
    height: '100px',
    'background-color': 'rgba(156, 168, 174, 0.18)',
    'margin-top': '7px',
    'margin-bottom': '0px',
    'border-radius': '10px'
  };

  ngOnInit(): void {
    this.getIconCategory();
  }
  onSelectAction(event: string) {
    this.dialogRef.close(event);
  }
  filterItem(): void {

    const searches = [
      {
        field: 'categoryKey',
        operator: 'eq',
        value: this.search ? undefined : this.selectedCategory
      },
      {
        field: 'tags',
        operator: 'lk',
        value: this.search
      }
    ]
    this.listPaginationRequest.pageNo = 0;
    this.listPaginationRequest.search = searches.filter((search) => search.value).map((item) => `${item.field}:${item.operator}:${item.value}`).join(',');
    this.getIconList();
  }

  onChangeCategory(event: string | undefined): void {
    this.selectedCategory = event;
    const search = event && event != "" ? 'categoryKey:eq:' + event : undefined;
    if (search) {
      this.listPaginationRequest.search = search;
    }
    else {
      // Reset the search filter if "all" is selected
      this.listPaginationRequest.search = undefined;
    }
    this.search = '';
    this.getIconList();
  }

  close(): void {
    this.dialogRef.close();
  }

  getIconCategory(): void {
    this.isBusy = true;
    this.iconService
      .fetchIconCategory().subscribe({
        next: (response: any) => {
          this.isBusy = false;
          this.iconCategoryList = response?.map((item: any) => {

            return {
              keyTt: item?.categoryKey!,
              valueTt: item?.categoryName,
            };
          });
          this.iconCategoryList = sortBy(this.iconCategoryList, item => item.valueTt.toLowerCase())
          this.iconCategoryList.unshift({
            keyTt: '',
            valueTt: 'All'
          })
          this.iconCategoryList = unionBy(this.iconCategoryList, 'keyTt')
          this.onChangeCategory('');
        },
        error: (_error: HttpErrorResponse) => {
          this.isBusy = false;
        }
      });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (Math.trunc(element.scrollHeight - element.scrollTop) === element.clientHeight) {
      this.showMore = true;
    } else {
      this.showMore = false;
    }
  }



  getIconList(): void {
    this.isBusy = true;
    this.iconList = [];
    this.iconService
      .fetchIconList(this.listPaginationRequest)
      .pipe(
        filter((item: any) => !!item),
        first()
      )
      .subscribe({
        next: (response: any) => {
          this.isBusy = false;
          this.iconList = response?.content;
          this.icons = response;
        },
        error: (_error: HttpErrorResponse) => {
          this.isBusy = false;
        }
      });
  }

  onPage(event: any): void {
    this.listPaginationRequest = {
      ...this.listPaginationRequest,
      pageNo: event.pageIndex
    };
    this.getIconList();
  }
}
