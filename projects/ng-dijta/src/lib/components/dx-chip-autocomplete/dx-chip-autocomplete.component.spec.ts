import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxChipAutocompleteComponent } from './dx-chip-autocomplete.component';

describe('DxChipAutocompleteComponent', () => {
  let component: DxChipAutocompleteComponent;
  let fixture: ComponentFixture<DxChipAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxChipAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxChipAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
