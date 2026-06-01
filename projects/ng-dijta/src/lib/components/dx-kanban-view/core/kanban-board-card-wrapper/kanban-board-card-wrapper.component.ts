import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ColumnVariants, KanbanViewColumnContent } from '../../model/dx-kanban-view.model';

@Component({
  selector: 'dx-kanban-board-card-wrapper',
  templateUrl: './kanban-board-card-wrapper.component.html',
  styleUrls: ['./kanban-board-card-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KanbanBoardCardWrapperComponent {
  @Input() content: KanbanViewColumnContent | undefined;
  @Input() type: ColumnVariants = 'standard';
  @Output() onClickAction: EventEmitter<string> = new EventEmitter<string>();


  onSelectAction(type: string): void {
    this.onClickAction.emit(type);
  }
}
