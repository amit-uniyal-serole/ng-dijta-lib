import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxSelectComponent } from './dx-select.component';

describe('DxSelectComponent', () => {
  let component: DxSelectComponent;
  let fixture: ComponentFixture<DxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
