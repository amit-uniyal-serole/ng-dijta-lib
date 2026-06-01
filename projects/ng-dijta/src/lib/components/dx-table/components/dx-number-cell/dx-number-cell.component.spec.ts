import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNumberCellComponent } from './dx-number-cell.component';

describe('DxNumberCellComponent', () => {
  let component: DxNumberCellComponent;
  let fixture: ComponentFixture<DxNumberCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxNumberCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxNumberCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
