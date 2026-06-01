import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxDirectiveModule } from '../../directive/directive.module';
import { DxCardModule } from '../dx-card';
import { KanbanBoardCardWrapperComponent } from './core/kanban-board-card-wrapper/kanban-board-card-wrapper.component';
import { KanbanBoardCardComponent } from './core/kanban-board-card/kanban-board-card.component';
import { DxKanbanViewComponent } from './dx-kanban-view.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    DxKanbanViewComponent,
    KanbanBoardCardComponent,
    KanbanBoardCardWrapperComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DxCardModule,
    MatMenuModule,
    MatTooltipModule,
    DxDirectiveModule,
    TranslocoModule
  ],
  exports: [
    DxKanbanViewComponent
  ]
})
export class DxKanbanViewModule { }
