import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxKanbanViewComponent } from './dx-kanban-view.component';

describe('DxKanbanViewComponent', () => {
  let component: DxKanbanViewComponent;
  let fixture: ComponentFixture<DxKanbanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxKanbanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxKanbanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
