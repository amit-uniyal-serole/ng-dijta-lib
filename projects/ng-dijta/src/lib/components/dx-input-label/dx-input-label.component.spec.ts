import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputLabelComponent } from './dx-input-label.component';

describe('DxInputLabelComponent', () => {
  let component: DxInputLabelComponent;
  let fixture: ComponentFixture<DxInputLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
