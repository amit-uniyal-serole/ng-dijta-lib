import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInlineDropdownComponent } from './dx-inline-dropdown.component';

describe('DxInlineDropdownComponent', () => {
  let component: DxInlineDropdownComponent;
  let fixture: ComponentFixture<DxInlineDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInlineDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInlineDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
