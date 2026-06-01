import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { KeyValueModel } from '../../../../core/UI/model/keyValue';

type MultiSelectKey = KeyValueModel['keyTt'];

/**
 * Compact multi-select cell renderer for `dx-table` used when a column's
 * `type` is `'multi-select'`. Renders a small trigger button showing the
 * currently selected labels; clicking opens a CDK overlay panel with a
 * checkbox list of options.
 *
 * Mirrors the `ControlValueAccessor` contract of `dx-table-select` so it
 * plugs into the same `[(ngModel)]` binding as the single-select cell.
 *
 * @example
 * ```html
 * <dx-table-multi-select
 *   [(ngModel)]="row.data.tags"
 *   [options]="col?.options"
 *   name="tags{{i}}">
 * </dx-table-multi-select>
 * ```
 */
@Component({
  selector: 'dx-table-multi-select',
  templateUrl: './dx-table-multi-select.component.html',
  styleUrls: ['./dx-table-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTableMultiSelectComponent),
      multi: true,
    },
  ],
})
export class DxTableMultiSelectComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  /** Observable of selectable options, matching `DxTableColumn.options`. */
  @Input() options!: Observable<KeyValueModel[]>;

  /** Marks the cell as required (shows a left-border indicator). @default false */
  @Input() required: boolean = false;

  /** Disables the trigger and prevents opening the panel. @default false */
  @Input() readonly: boolean = false;

  /** Form field name used when the cell participates in an NgForm. @default '' */
  @Input() name: string = '';

  /** Placeholder text shown when no values are selected. @default 'Select' */
  @Input() placeholder: string = 'Select';

  /** Maximum labels joined into the trigger before collapsing to `+N more`. @default 2 */
  @Input() displayLimit: number = 2;

  selectedValues: MultiSelectKey[] = [];
  resolvedOptions: KeyValueModel[] = [];
  isOpen: boolean = false;

  /** First `displayLimit` selected labels joined by ", ". Truncates with ellipsis in the trigger. */
  displayedLabelText: string = '';
  /** Count of additional selected labels beyond `displayLimit`. Rendered as a `+N` badge that never clips. */
  overflowCount: number = 0;

  private onChange: (value: MultiSelectKey[]) => void = () => { };
  private onTouched: () => void = () => { };
  private optionsSubscription?: Subscription;

  ngOnInit(): void {
    this.optionsSubscription = this.options?.subscribe((list: KeyValueModel[]) => {
      this.resolvedOptions = (list ?? []).filter(o => !!o?.valueTt);
      this.updateDisplay();
    });
  }

  ngOnDestroy(): void {
    this.optionsSubscription?.unsubscribe();
  }

  registerOnChange(fn: (value: MultiSelectKey[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: MultiSelectKey[] | MultiSelectKey | null | undefined): void {
    if (Array.isArray(value)) {
      this.selectedValues = [...value];
    } else if (value === null || value === undefined || value === '') {
      this.selectedValues = [];
    } else {
      this.selectedValues = [value];
    }
    this.updateDisplay();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
    if (isDisabled) {
      this.isOpen = false;
    }
  }

  trackByKey(_: number, option: KeyValueModel): MultiSelectKey {
    return option?.keyTt;
  }

  toggle(): void {
    if (this.readonly) {
      return;
    }
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.onTouched();
    }
  }

  close(): void {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.onTouched();
  }

  isSelected(key: MultiSelectKey): boolean {
    return this.selectedValues.includes(key);
  }

  toggleOption(key: MultiSelectKey, checked: boolean): void {
    if (checked) {
      if (!this.isSelected(key)) {
        this.selectedValues = [...this.selectedValues, key];
      }
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== key);
    }
    this.updateDisplay();
    this.onChange(this.selectedValues);
  }

  private updateDisplay(): void {
    if (!this.selectedValues.length || !this.resolvedOptions.length) {
      this.displayedLabelText = '';
      this.overflowCount = 0;
      return;
    }
    const labels: string[] = this.selectedValues
      .map((key: MultiSelectKey) => this.resolvedOptions.find(o => o?.keyTt === key)?.valueTt)
      .filter((label): label is string => !!label);
    this.displayedLabelText = labels.slice(0, this.displayLimit).join(', ');
    this.overflowCount = Math.max(0, labels.length - this.displayLimit);
  }
}
