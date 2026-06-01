import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DxFilter, DxTableColumn, OnAction } from '../../dx-table/interfaces/dx-table.interface';
import { DxCanvasSetting, DxCanvasData, IconColor } from '../model/dx-canvas-interface';
import { isEqual, sortBy } from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MultiViewTable, TABLE_VIEW_TYPES } from '../../dx-table-view-wrapper/model/table-view-wrapper.interface';
import { PageSize } from '../../dx-table';

@Component({
  selector: 'dx-canvas',
  templateUrl: './dx-canvas.component.html',
  styleUrls: ['./dx-canvas.component.scss'],
  animations: [trigger('rotatedState', [
    state('default', style({ transform: 'rotate(45deg)' })),
    state('rotated', style({ transform: 'rotate(0)' })),
    transition('* => *', animate('200ms ease-in'))
  ])]
})
export class DxCanvasComponent<T> implements OnInit {
  @Input() canvasDataSource!: DxCanvasData<T>[]
  @Input() canvasSetting!: DxCanvasSetting;
  @Input() cardActions!: DxTableColumn<T>;
  @Input() multiViewTable!: MultiViewTable;
  @Output() onCanvasCheckboxChange: EventEmitter<DxCanvasData<T>[]> =
    new EventEmitter<DxCanvasData<T>[]>();
  @Output() onCanvasPaginationClick: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() onClickCanvasHeaderAction: EventEmitter<DxFilter> =
    new EventEmitter<DxFilter>();
  @Output() onClickCanvasAction: EventEmitter<OnAction<T>> =
    new EventEmitter<OnAction<T>>();
  @Output() onClickCanvasViewSwitcher: EventEmitter<TABLE_VIEW_TYPES> =
    new EventEmitter<TABLE_VIEW_TYPES>();
  selection: SelectionModel<DxCanvasData<T>> = new SelectionModel<
    DxCanvasData<T>
  >(true, []);
  @Output() onClickCanvasPageSize: EventEmitter<PageSize> = new EventEmitter<
    PageSize
  >();
  canvasViewType!: string;
  state: string = 'default';

  ngOnInit(): void {
    this.setIdsToDataSource()
    this.canvasViewType = this.canvasSetting?.viewType ?? 'canvas-1'
    this.selection?.changed?.subscribe(
      (selected: SelectionChange<DxCanvasData<T>>) => {
        this.onCanvasCheckboxChange?.emit(selected?.source?.selected)
      }
    );
  }
  setIdsToDataSource(): void {
    this.canvasDataSource?.forEach((card: DxCanvasData<T>) => {
      if (card) {
        setTimeout(() => {
          card.id = card?.id ?? new Date().getTime()
        }, 1)
      }
    })
  }
  setColor(color: string): IconColor {
    const clr: IconColor = {
      color: color ?? '#000000'
    }
    return clr
  }
  onActionClick(event: OnAction<T>): void {
    this.onClickCanvasAction?.emit(event)
  }
  onClickHeaderAction(event: DxFilter) {
    this.onClickCanvasHeaderAction?.emit(event)
  }
  onPagination(page: PageEvent): void {
    this.onCanvasPaginationClick?.emit(page)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEqual(sortBy(changes?.canvasDataSource?.currentValue), sortBy(changes?.canvasDataSource?.previousValue))) {
      this.selection?.clear();
      this.setIdsToDataSource()
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected: number = this.selection?.selected?.length;
    const numRows: number = this.canvasDataSource?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection?.clear();
      return;
    }
    this.selection?.select(...this.canvasDataSource);
  }

  onSliderToggle(event: MatSlideToggleChange, selectedCard: DxCanvasData<T>): void {
    this.canvasDataSource
      = this.canvasDataSource?.map((canvasData: DxCanvasData<T>) => {
        if (canvasData.card) {
          canvasData.card.isSticky = false
        }
        return canvasData
      })
    this.canvasDataSource = this.canvasDataSource?.map((updateCardData: DxCanvasData<T>) => {
      if (updateCardData.card && updateCardData?.id === selectedCard?.id) {
        updateCardData.card.isSticky = !event
      }
      return updateCardData
    })
  }
  onClickViewSwitcher(event: TABLE_VIEW_TYPES): void {
    this.onClickCanvasViewSwitcher.emit(event)
  }
  onClickCanvasView(event: string): void {
    this.canvasViewType = event
  }
  onClickPageSize(event: PageSize): void {
    this.onClickCanvasPageSize?.emit(event)
  }
}



