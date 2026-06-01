import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTagCellComponent } from './dx-tag-cell.component';

describe('DxTagCellComponent', () => {
  let component: DxTagCellComponent;
  let fixture: ComponentFixture<DxTagCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTagCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTagCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
