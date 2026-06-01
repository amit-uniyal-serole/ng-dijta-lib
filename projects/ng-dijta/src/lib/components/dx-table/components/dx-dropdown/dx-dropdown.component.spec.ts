import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDropdownComponent } from './dx-dropdown.component';

describe('DxDropdownComponent', () => {
  let component: DxDropdownComponent;
  let fixture: ComponentFixture<DxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
