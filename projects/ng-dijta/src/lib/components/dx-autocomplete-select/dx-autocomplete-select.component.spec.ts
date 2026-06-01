import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAutocompleteSelectComponent } from './dx-autocomplete-select.component';

describe('DxAutocompleteSelectComponent', () => {
  let component: DxAutocompleteSelectComponent;
  let fixture: ComponentFixture<DxAutocompleteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAutocompleteSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxAutocompleteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
