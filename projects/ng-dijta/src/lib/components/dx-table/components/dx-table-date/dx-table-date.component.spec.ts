import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableDateComponent } from './dx-table-date.component';

describe('DxTableDateComponent', () => {
  let component: DxTableDateComponent;
  let fixture: ComponentFixture<DxTableDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
