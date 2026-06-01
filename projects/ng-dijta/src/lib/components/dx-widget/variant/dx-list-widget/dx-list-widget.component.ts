import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { WidgetListingActionModel, WidgetModel } from '../../model/widget-data';
@Component({
  selector: 'dx-list-widget',
  templateUrl: './dx-list-widget.component.html',
  styleUrls: ['./dx-list-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxListWidgetComponent {
  @Input() outline: 'list' | 'none' = 'list';
  @Input() widgetSource!: WidgetModel;
  @Output() onClickAction: EventEmitter<WidgetListingActionModel> = new EventEmitter<WidgetListingActionModel>()

  onClickViewAll(actionList:WidgetListingActionModel): void {
    this.onClickAction?.emit(actionList)
  }
}
