import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableMultiChipComponent } from './dx-table-multi-chipcomponent';

describe('DxTableMultiChipComponent', () => {
  let component: DxTableMultiChipComponent;
  let fixture: ComponentFixture<DxTableMultiChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableMultiChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableMultiChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
