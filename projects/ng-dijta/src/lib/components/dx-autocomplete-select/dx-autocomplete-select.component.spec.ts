import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAutocompleteSelectComponent } from './dx-autocomplete-select.component';
import { KeyValueModel } from '../../core/UI/model/keyValue';

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

  describe('_filter (keyTt OR valueTt, case-insensitive substring)', () => {
    const options: KeyValueModel[] = [
      { keyTt: '1000', valueTt: 'Plant Syde' },
      { keyTt: '2000', valueTt: 'Plant Hamburg' },
      { keyTt: '3000', valueTt: 'Berlin Warehouse' },
    ];

    beforeEach(() => {
      component.options = options;
    });

    it('matches by code (keyTt)', () => {
      const result = (component as any)._filter('1000');
      expect(result).toEqual([options[0]]);
    });

    it('matches by name substring (valueTt) anywhere in the string', () => {
      const result = (component as any)._filter('syde');
      expect(result).toEqual([options[0]]);
    });

    it('is case-insensitive', () => {
      const result = (component as any)._filter('HAMBURG');
      expect(result).toEqual([options[1]]);
    });

    it('returns multiple matches when the substring appears in many options', () => {
      const result = (component as any)._filter('plant');
      expect(result).toEqual([options[0], options[1]]);
    });

    it('handles numeric keyTt via String() coercion', () => {
      component.options = [{ keyTt: 4242, valueTt: 'Numeric Plant' }];
      const result = (component as any)._filter('42');
      expect(result.length).toBe(1);
    });
  });
});
