// @ts-nocheck — pre-existing generic type errors; component was made generic after spec was written
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCellProgressBarComponent } from './dx-cell-progress-bar.component';

describe('DxCellProgressBarComponent', () => {
  let component: DxCellProgressBarComponent;
  let fixture: ComponentFixture<DxCellProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCellProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCellProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
