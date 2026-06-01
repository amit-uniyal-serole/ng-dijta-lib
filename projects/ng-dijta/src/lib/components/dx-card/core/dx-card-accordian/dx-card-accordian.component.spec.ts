import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardAccordianComponent } from './dx-card-accordian.component';

describe('DxCardAccordianComponent', () => {
  let component: DxCardAccordianComponent;
  let fixture: ComponentFixture<DxCardAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardAccordianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
