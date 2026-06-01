import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KanbanBoardColumnChangeModel, KanbanBoardSequenceChangeModel, KanbanCardActionEvent, KanbanViewColumnContent, KanbanViewColumnsModel, KanbanViewModel } from './model/dx-kanban-view.model';

@Component({
  selector: 'dx-kanban-view',
  templateUrl: './dx-kanban-view.component.html',
  styleUrls: ['./dx-kanban-view.component.scss']
})
export class DxKanbanViewComponent implements OnChanges {

  @Input() dataSource: KanbanViewModel | undefined;
  @Output() onColumnChange: EventEmitter<KanbanBoardColumnChangeModel> = new EventEmitter<KanbanBoardColumnChangeModel>();
  @Output() onSequenceChange: EventEmitter<KanbanBoardSequenceChangeModel> = new EventEmitter<KanbanBoardSequenceChangeModel>();
  @Output() onKanbanCardAction: EventEmitter<KanbanCardActionEvent> = new EventEmitter<KanbanCardActionEvent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']?.previousValue !== changes['dataSource']?.currentValue) {
      this.dataSource = changes['dataSource']?.currentValue;
    }
  }

  getColumnId(): string[] | undefined {
    return this.dataSource?.columns?.map((column: KanbanViewColumnsModel) => column?.id)
  }

  public drop(event: CdkDragDrop<KanbanViewColumnContent[]>): void {
    if (event.previousContainer === event.container) {

      moveItemInArray(event?.container?.data, event.previousIndex, event.currentIndex);
      const payload = event?.container?.data.map((item, i: number) => {
        return {
          ...item,
          sequence: i + 1,
        }
      });

      this.onSequenceChange.emit({
        currentColumnId: event?.container?.id,
        data: payload
      });

    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const payload: KanbanBoardColumnChangeModel = {
        transferedTo: event?.container?.id,
        data: event?.item?.data
      }
      this.onColumnChange.emit(payload);

    }

  }

  onClickAction(event: string, content: KanbanViewColumnContent): void {
    let eventData: KanbanCardActionEvent = {
      type: event,
      data: content
    }
    this.onKanbanCardAction.emit(eventData);
  }

  getContrastColor(color: string): string {
    // Convert color to RGB format
    const hex: string = color.replace("#", "");
    const r: number = parseInt(hex.substr(0, 2), 16);
    const g: number = parseInt(hex.substr(2, 2), 16);
    const b: number = parseInt(hex.substr(4, 2), 16);

    // Calculate perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine contrast color
    return brightness > 128 ? "#000000" : "#ffffff";
  }

  headerBackgroundColor(color: string) {
    return {
      backgroundColor: color,
      color: this.getContrastColor(color)
    }
  }
}
