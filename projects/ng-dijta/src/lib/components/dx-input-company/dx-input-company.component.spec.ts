import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputCompanyComponent } from './dx-input-company.component';

describe('DxInputCompanyComponent', () => {
  let component: DxInputCompanyComponent;
  let fixture: ComponentFixture<DxInputCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
