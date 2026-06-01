import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardCardWrapperComponent } from './kanban-board-card-wrapper.component';

describe('KanbanBoardCardWrapperComponent', () => {
  let component: KanbanBoardCardWrapperComponent;
  let fixture: ComponentFixture<KanbanBoardCardWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardCardWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanBoardCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
