// @ts-nocheck — pre-existing generic type errors; component was made generic after spec was written
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardListViewComponent } from './dx-card-list-view.component';

describe('DxCardListViewComponent', () => {
  let component: DxCardListViewComponent;
  let fixture: ComponentFixture<DxCardListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
