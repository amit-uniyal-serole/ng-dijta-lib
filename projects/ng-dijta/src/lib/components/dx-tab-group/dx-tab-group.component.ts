import {
  Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TabComponent } from './tab/tab.component';
@Component({
  selector: 'dx-tab-group',
  template: `
    <div *ngIf="show" [class]="tabsAlign" [class]="outline">
      <mat-tab-group mat-stretch-tabs="false" [animationDuration]="animationDuration" [selectedIndex]="selectedIndex"
        [headerPosition]="headerPosition" (selectFocusedIndex)="onSelectFocusedIndex($event)" [color]="color"
        [backgroundColor]="backgroundColor" (selectedTabChange)="onTabChanged($event)">
        <mat-tab *ngFor="let item of appItems" [disabled]="item.disabled">
          <ng-template mat-tab-label>
            <ng-container *ngTemplateOutlet="item?.itemHeader?.headerTemplate"></ng-container>
          </ng-template>
          <ng-container *ngTemplateOutlet="item?.contentTemplate"></ng-container>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class DxTabGroupComponent implements OnInit {
  @ContentChildren(TabComponent) public appItems!: QueryList<TabComponent>;
  @Input() tabsAlign: 'start' | 'center' | 'end' = 'start';
  @Input() outline: 'filled' | 'top_underline' | 'bottom_underline_bg' | 'none' = 'none';
  @Input() animationDuration: string = '500ms';
  @Input() headerPosition: 'below' | '' = '';
  @Input() color: string = '';
  @Input() backgroundColor: string = 'red';
  @Input() show: boolean = false;
  @Input() selectedIndex: number = 0;
  @Output() selectFocusedIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();
  ngOnInit(): void {
    setTimeout(() => {
      this.show = true
    }, 0);
  }

  onSelectFocusedIndex(event: any): void {
    this.selectFocusedIndex.emit();
  }

  onTabChanged(event: MatTabChangeEvent): void {
    this.selectedTabChange.emit(event)
  }
}