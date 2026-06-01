import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxChipSelectComponent } from './dx-chip-select.component';

describe('DxChipSelectComponent', () => {
  let component: DxChipSelectComponent;
  let fixture: ComponentFixture<DxChipSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxChipSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxChipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
