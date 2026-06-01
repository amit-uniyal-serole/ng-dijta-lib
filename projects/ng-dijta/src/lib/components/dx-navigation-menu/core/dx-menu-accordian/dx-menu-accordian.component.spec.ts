import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxMenuAccordianComponent } from './dx-menu-accordian.component';

describe('DxMenuAccordianComponent', () => {
  let component: DxMenuAccordianComponent;
  let fixture: ComponentFixture<DxMenuAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxMenuAccordianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxMenuAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
