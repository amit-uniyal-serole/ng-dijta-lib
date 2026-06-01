import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, OnChanges, OnInit, Optional, Output, Self, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, Subscription, of, ReplaySubject, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { KeyValueModel, UI_COMPONENT_CONFIG, UIConfigWrapper, KeyValueGroup } from '../../core';
import { CreateOption } from '../dx-autocomplete-select';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dx-chip-autocomplete',
  templateUrl: './dx-chip-autocomplete.component.html',
  styleUrls: ['./dx-chip-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxChipAutocompleteComponent implements OnInit, OnChanges {
  @Input() loading: boolean = false;
  @Input() required: boolean = false;
  @Input() options!: KeyValueModel[];
  @Input() groups!: KeyValueGroup[];
  @Input() disabled: boolean = false;
  @Input() showToolTip: boolean = true;
  @Input() country: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() createOption: CreateOption = {}
  static nextId = 0;
  @HostBinding()
  id = `dx-input-chip-autocomplete-${DxChipAutocompleteComponent.nextId++}`;
  @ViewChild('inputRef') inputRef!: ElementRef;
  @ViewChild('singleSelect') singleSelect!: MatSelect;
  @ViewChild('multiSelect') multiSelect!: MatSelect;
  @Output() onSelectChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onautoCompleteSelect: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onClickCreateOption: EventEmitter<void> =
    new EventEmitter<void>();
  public filteredGroups: ReplaySubject<KeyValueGroup[]> = new ReplaySubject<KeyValueGroup[]>(1);
  searchCtrl: FormControl = new FormControl();
  filteredOptions!: Observable<KeyValueModel[]>;
  selectedValue!: string;
  displayValue!: KeyValueModel[] | undefined;
  filteredList!: Observable<KeyValueModel[]>;
  obj!: KeyValueModel | undefined;
  searchCntrlSubscription!: Subscription;
  filterSubscription!: Subscription;
  protected _onDestroy = new Subject<void>();
  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    @Self() @Optional() public control: NgControl,
    @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    private readonly cd: ChangeDetectorRef) {
    this.control && (this.control.valueAccessor = this);
    this.outline = config?.value?.outline ?? 'none-floating';
  }


  ngOnInit(): void {
    this.refillList();
    this.searchCntrlSubscription = this.searchCtrl?.valueChanges?.subscribe(
      (res: string) => {
        if (res && res != '') {
          this.onautoCompleteSelect.emit(res);
        }
      }
    );
    this.createOption.label = this.createOption?.label ?? 'Create New Option'
  }

  value!: KeyValueModel[];

  onChange: Function = () => { };
  onTouched: Function = () => { };

  inputChange(event: KeyValueModel[]): void {
    Object.keys(event).forEach(key => {
      if (event[key] === '') {
        delete event[key];
      }
    });
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: KeyValueModel[]): void {
    this.onTouched();
    this.value = this.control.value;
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  refillList(): void {
    this.filteredList = of(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.options?.previousValue != changes?.options?.currentValue) {
      this.options = this.options;
      this.initFilterList();
      this.cd?.detectChanges();
    }

    if (changes?.groups?.previousValue != changes?.groups?.currentValue) {
      this.filteredGroups.next(this.copyGroupOptions(this.groups));

      // listen for search field value changes
      this.searchCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBankGroups();
        });
    }
  }
  private _filter(option: string): KeyValueModel[] {
    const filterValue: string = option?.toLowerCase();
    return this.options?.filter(
      (option: KeyValueModel) =>
        option?.valueTt?.toLowerCase()?.indexOf(filterValue) === 0
    );
  }

  initFilterList(): void {
    this.filteredOptions = this.searchCtrl?.valueChanges?.pipe(
      startWith(''),
      map((value: KeyValueModel) =>
        typeof value === 'string' ? value : value?.valueTt
      ),
      map((name: string) => (name ? this._filter(name) : this.options?.slice()))
    );
  }
  onDropDownChange(value: any): void {
    this.onSelectChange.emit(value);
  }
  onClickCreateCustomOption(): void {
    this.singleSelect?.close()
    this.onClickCreateOption?.emit();
  }

  comparer(option1: KeyValueModel, option2: KeyValueModel): boolean {
    return option1?.keyTt === option2?.keyTt
  }
  onRemoveChip(data: KeyValueModel): void {
    this.removeFirst(this.value, data);
    this.control?.control?.setValue(this.value); // To trigger change detection
    this.multiSelect.value = this.value
  }

  private removeFirst(array: KeyValueModel[], toRemove: KeyValueModel): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }




  ngOnDestroy(): void {
    if (this.searchCntrlSubscription) {
      this.searchCntrlSubscription?.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription?.unsubscribe();
    }
  }


  //group
  protected filterBankGroups(): void {
    if (!this.groups) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    const groupOptionsCopy = this.copyGroupOptions(this.groups);
    if (!search) {
      this.filteredGroups.next(groupOptionsCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredGroups.next(
      groupOptionsCopy.filter((bankGroup: KeyValueGroup) => {
        const showBankGroup = bankGroup?.label?.toLowerCase()?.indexOf(search)! > -1;
        if (!showBankGroup) {
          bankGroup.options = bankGroup?.options?.filter(bank => bank.valueTt.toLowerCase().indexOf(search) > -1);
        }
        return bankGroup?.options?.length! > 0;
      })
    );
  }

  protected copyGroupOptions(optionGroups: KeyValueGroup[]): KeyValueGroup[] {
    const optionGroupsCopy: KeyValueGroup[] = [];
    optionGroups.forEach(optionGroup => {
      optionGroupsCopy.push({
        label: optionGroup?.label,
        options: optionGroup?.options?.slice()
      });
    });
    return optionGroupsCopy;
  }
}
