import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxBulkActionsComponent } from './dx-bulk-actions.component';

describe('DxBulkActionsComponent', () => {
  let component: DxBulkActionsComponent;
  let fixture: ComponentFixture<DxBulkActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxBulkActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxBulkActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
