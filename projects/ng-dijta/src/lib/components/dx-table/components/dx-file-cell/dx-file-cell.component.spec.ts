import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFileCellComponent } from './dx-file-cell.component';

describe('DxFileCellComponent', () => {
  let component: DxFileCellComponent;
  let fixture: ComponentFixture<DxFileCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxFileCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DxFileCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
