import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    EventEmitter,
    Output,
    ViewEncapsulation,
    ElementRef,
    ChangeDetectionStrategy,
  } from '@angular/core';
  import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
  import { DxColumnSorterService, ColumnInfo } from './dx-column-sorter.service';
  
  @Component({
    selector: 'dx-column-sorter, button[dx-column-sorter]',
    templateUrl: './dx-column-sorter.component.html',
    styleUrls: ['./dx-column-sorter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DxColumnSorterService],
  })
  export class DxColumnSorterComponent implements OnInit, AfterViewInit {
    @Output()
    columnsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Input()
    columns!: string[];
    @Input()
    columnNames!: string[];
    @Input()
    saveName?: string;
  
    columnInfo!: ColumnInfo[];
  
    constructor(private elementRef: ElementRef) {}
  
    ngOnInit() {
      this.columnInfo = this.columns.map((currElement, index) => {
        return {
          id: currElement,
          name: this.columnNames[index],
          hidden: false,
        };
      });
      this.emitColumns(false);
    }
  
    ngAfterViewInit(): void {
      this.elementRef.nativeElement.classList += 'va-mat-button-no-input';
    }
  
    columnMenuDropped(event: CdkDragDrop<any>): void {
      moveItemInArray(this.columnInfo, event.item.data.columnIndex, event.currentIndex);
      this.emitColumns(true);
    }
  
    toggleSelectedColumn(columnId: string): void {
      const colFound = this.columnInfo.find(col => col?.id === columnId);
      if(colFound) {
        colFound.hidden = !colFound.hidden;
      }
      this.emitColumns(true);
    }
  
    private emitColumns(saveColumns: boolean): void {
      // Only emit the columns on the next animation frame available    
      
      window.requestAnimationFrame(() => {
        this.columnsChange.emit(this.columnInfo.filter(colInfo => !colInfo?.hidden).map(colInfo => colInfo?.id));
      });
    }
  }
  