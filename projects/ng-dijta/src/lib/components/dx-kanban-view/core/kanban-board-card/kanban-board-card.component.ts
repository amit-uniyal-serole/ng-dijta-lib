import { Component, OnInit,Input } from '@angular/core';
import { DxDetailsCardContent } from '../../../dx-card';

@Component({
  selector: 'dx-kanban-board-card',
  templateUrl: './kanban-board-card.component.html',
  styleUrls: ['./kanban-board-card.component.scss']
})
export class KanbanBoardCardComponent implements OnInit {
@Input() data:DxDetailsCardContent | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
