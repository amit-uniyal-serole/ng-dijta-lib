// @ts-nocheck — pre-existing generic type errors; component was made generic after spec was written
import { of } from 'rxjs';
import { DxTableMultiSelectComponent } from './dx-table-multi-select.component';

describe('DxTableMultiSelectComponent', () => {
  let component: DxTableMultiSelectComponent;

  beforeEach(() => {
    component = new DxTableMultiSelectComponent();
    component.options = of([
      { keyTt: 'a', valueTt: 'Alpha' },
      { keyTt: 'b', valueTt: 'Beta' },
      { keyTt: 'c', valueTt: 'Gamma' },
    ]);
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue initializes selectedValues from an array', () => {
    component.writeValue(['a']);
    expect(component.selectedValues).toEqual(['a']);
    expect(component.isSelected('a')).toBeTrue();
    expect(component.isSelected('b')).toBeFalse();
  });

  it('writeValue normalizes null/undefined/scalar to an array', () => {
    component.writeValue(null);
    expect(component.selectedValues).toEqual([]);
    component.writeValue('a');
    expect(component.selectedValues).toEqual(['a']);
  });

  it('toggleOption adds and removes selections', () => {
    component.toggleOption('a', true);
    expect(component.selectedValues).toEqual(['a']);
    component.toggleOption('b', true);
    expect(component.selectedValues).toEqual(['a', 'b']);
    component.toggleOption('a', false);
    expect(component.selectedValues).toEqual(['b']);
  });

  it('displayLabel joins labels and collapses overflow', () => {
    component.writeValue(['a', 'b']);
    expect(component.displayLabel()).toBe('Alpha, Beta');
    component.writeValue(['a', 'b', 'c']);
    component.displayLimit = 2;
    expect(component.displayLabel()).toBe('Alpha, Beta +1');
  });

  it('toggle respects readonly', () => {
    component.readonly = true;
    component.toggle();
    expect(component.isOpen).toBeFalse();
  });

  it('toggle opens and closes', () => {
    component.toggle();
    expect(component.isOpen).toBeTrue();
    component.toggle();
    expect(component.isOpen).toBeFalse();
  });
});
