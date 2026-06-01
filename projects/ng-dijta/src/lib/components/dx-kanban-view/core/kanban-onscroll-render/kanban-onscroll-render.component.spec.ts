import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanOnscrollRenderComponent } from './kanban-onscroll-render.component';

describe('KanbanOnscrollRenderComponent', () => {
  let component: KanbanOnscrollRenderComponent;
  let fixture: ComponentFixture<KanbanOnscrollRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanOnscrollRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanOnscrollRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
