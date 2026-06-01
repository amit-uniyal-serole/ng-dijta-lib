import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

import {
  FormGroupDirective,
  NgControl,
  NgForm,
  NG_VALIDATORS,
} from '@angular/forms';
import {
  AsYouType,
  CountryCode as CC,
  E164Number,
  getExampleNumber,
  NationalNumber,
  parsePhoneNumberFromString,
  PhoneNumber,
} from 'libphonenumber-js';
import { CountryCode, Examples, allCountriesCode } from './data/country-code';
import { Country } from './model/country.model';
import { PhoneNumberFormat } from './model/phone-number-format.model';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CanUpdateErrorState,
  ErrorStateMatcher,
  mixinErrorState,
  _AbstractConstructor,
  _Constructor,
} from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatMenu } from '@angular/material/menu';
import { Subject, firstValueFrom } from 'rxjs';
import { phoneNumberValidator } from './dx-mat-intl-tel-input.validator';
import { isEqual } from 'lodash';
import { HttpClient } from '@angular/common/http';

class NgxMatIntlTelInputBase {
  readonly stateChanges = new Subject<void>();
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl
  ) { }
}

declare type CanUpdateErrorStateCtor = _Constructor<CanUpdateErrorState> &
  _AbstractConstructor<CanUpdateErrorState>;

const _NgxMatIntlTelInputMixinBase: CanUpdateErrorStateCtor &
  typeof NgxMatIntlTelInputBase = mixinErrorState(NgxMatIntlTelInputBase);

@Component({
  selector: 'dx-phone-contact',
  templateUrl: './phone-contact.component.html',
  styleUrls: ['./phone-contact.component.scss'],
  providers: [
    CountryCode,
    { provide: MatFormFieldControl, useExisting: PhoneContactComponent },
    {
      provide: NG_VALIDATORS,
      useValue: phoneNumberValidator,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PhoneContactComponent
  extends _NgxMatIntlTelInputMixinBase
  implements
  OnInit,
  OnDestroy,
  DoCheck,
  CanUpdateErrorState,
  MatFormFieldControl<any> {
  static nextId = 0;

  @Input() preferredCountries: Array<string> = [];
  @Input() enablePlaceholder = true;
  @Input() inputPlaceholder: string | undefined;
  @Input() cssClass: string | undefined;
  @Input() name: string | undefined;
  @Input() onlyCountries: Array<string> = [];
  @Input() errorStateMatcher: ErrorStateMatcher = new ErrorStateMatcher();
  @Input() enableSearch = false;
  @Input() searchPlaceholder: string | undefined;
  @Input() describedBy = '';
  @Input() readonly!: boolean;
  @Input() disableIsoToNumber!: boolean;
  @Input() tabIndex: number | undefined;
  @Input() autoChangeFeature: boolean = false;
  @Input() countriesUrl: string = '/api/dx-mstd-api/country/all';

  @Input()
  get format(): PhoneNumberFormat {
    return this._format;
  }

  set format(value: PhoneNumberFormat) {
    this._format = value;
    this.phoneNumber = this.formattedPhoneNumber as NationalNumber;
    this.stateChanges.next();
  }

  @ViewChild(MatMenu) matMenu: MatMenu | undefined;
  private _placeholder: string | undefined;
  private _required = false;
  private _disabled = false;
  stateChanges = new Subject<void>();
  focused = false;
  @HostBinding()
  @Input() id = `dx-input-phone-${PhoneContactComponent.nextId++}`;
  phoneNumber: NationalNumber | undefined;
  allCountries: Array<Country> = [];
  allCountriesData: Array<Country> = [];
  preferredCountriesInDropDown: Array<Country> = [];
  selectedCountry: Country | undefined;
  numberInstance: PhoneNumber | undefined;
  value: E164Number | string | undefined;
  searchCriteria: string | undefined;
  hideSelection: boolean | undefined = false;
  @Output() countryChanged = new EventEmitter<Country>();

  private previousFormattedNumber: string | undefined;
  private _format: PhoneNumberFormat = 'default';

  static getPhoneNumberPlaceHolder(countryISOCode: CC): string | undefined {
    const result = getExampleNumber(countryISOCode, Examples);
    return !!result ? result.nationalNumber.toString() : undefined;
  }

  onTouched = () => { };

  propagateChange = (_: any) => { };
  http = inject(HttpClient);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private countryCodeData: CountryCode,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    fm.monitor(elRef, true).subscribe((origin) => {
      // if (this.focused && !origin) {
      //   this.onTouched();
      // }
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.fetchCountryData();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      if (this.countriesUrl) {
        const countryList = await firstValueFrom(
          this.http.get<any[]>(this.countriesUrl)
        );
        this.onlyCountries = countryList.map(
          c => (c?.iso2Cd ?? '').toLowerCase()
        );
      }
    } catch (error) {
      // error case: still run init
    } finally {
      this.init();
    }
  }

  private init(): void {
    if (!this.searchPlaceholder) {
      this.searchPlaceholder = 'Search ...';
    }
    
    if (this.preferredCountries?.length) {
      this.preferredCountries?.forEach((iso2) => {
        const preferredCountry = this.allCountries
          .filter((c) => c.iso2 === iso2)
          .shift();
        if (preferredCountry) {
          this.preferredCountriesInDropDown.push(preferredCountry);
        }
      });
    }
    
    if (this.onlyCountries?.length === 0) {
      this.onlyCountries = allCountriesCode.map((c) => c.keyTt);
    }
    if (this.onlyCountries.length) {
      this.allCountries = this.allCountries.filter((c) =>
        this.onlyCountries.includes(c.iso2)
      );
    }
    if (this.numberInstance?.country) {
      // If an existing number is present, we use it to determine selectedCountry
      this.selectedCountry = this.getCountry(this.numberInstance.country);
    } else if (this.preferredCountriesInDropDown.length) {
      this.selectedCountry = this.preferredCountriesInDropDown[0];
    } else {
      this.selectedCountry = this.allCountries[0];
    }
    this.countryChanged.emit(this.selectedCountry);
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
    this.checkIfWeHaveOnlyCountry();
  }

  private checkIfWeHaveOnlyCountry(): void {
    this.hideSelection = isEqual(this.preferredCountries, this.onlyCountries);
  }

  countryBtn(): void {
    this.preferredCountriesInDropDown = [];
    this.allCountries = [];
    if (this.preferredCountries?.length) {
      this.preferredCountries?.forEach((iso2: string) => {
        const preferredCountry = this.allCountriesData
          .filter((country: Country) => country.iso2 === iso2)
          .shift();
        if (preferredCountry) {
          this.preferredCountriesInDropDown.push(preferredCountry);
        }
      });
    }
    if (this.onlyCountries.length) {
      this.allCountries = this.allCountriesData.filter((country: Country) =>
        this.onlyCountries.includes(country.iso2)
      );
    }
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  public onPhoneNumberChange(): void {
    try {
      this.numberInstance = parsePhoneNumberFromString(
        this.phoneNumber?.toString() ?? '',
        this.selectedCountry?.iso2.toUpperCase() as CC
      );
      this.formatAsYouTypeIfEnabled();
      this.value = this.numberInstance?.number ?? this.phoneNumber;
      if (this.numberInstance?.isValid()) {
        if (this.phoneNumber !== this.formattedPhoneNumber) {
          this.phoneNumber = this.formattedPhoneNumber as NationalNumber;
        }
        if (
          this.selectedCountry?.iso2 !== this.numberInstance.country &&
          !!this.numberInstance.country
        ) {
          if (this.autoChangeFeature) {
            this.selectedCountry = this.getCountry(this.numberInstance.country);
            this.countryChanged.emit(this.selectedCountry);
          }
        }
      }
    } catch (e) {
      // if no possible numbers are there,
      // then the full number is passed so that validator could be triggered and proper error could be shown
      this.value = this.phoneNumber?.toString();
    }

    this.propagateChange(this.value);
    this._changeDetectorRef.markForCheck();
  }

  public onCountrySelect(country: Country, el: MatInput): void {
    if (this.phoneNumber) {
      this.phoneNumber = this.numberInstance?.nationalNumber;
    }
    this.selectedCountry = country;
    this.countryChanged.emit(this.selectedCountry);
    this.onPhoneNumberChange();
    el.focus();
  }

  public getCountry(code: string): Country {
    return (
      this.allCountries.find((c) => c.iso2 === code.toLowerCase()) || {
        name: 'UN',
        iso2: 'UN',
        dialCode: '',
        priority: 0,
        areaCodes: undefined,
        flagClass: 'UN',
        placeHolder: '',
      }
    );
  }

  public onInputKeyPress(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  protected fetchCountryData(): void {
    this.countryCodeData.allCountries.forEach((c) => {
      const country: Country = {
        name: c[0].toString(),
        iso2: c[1].toString(),
        dialCode: c[2].toString(),
        priority: +c[3] || 0,
        areaCodes: (c[4] as string[]) || undefined,
        flagClass: c[1].toString().toUpperCase(),
        placeHolder: '',
      };

      if (this.enablePlaceholder) {
        country.placeHolder =
          PhoneContactComponent.getPhoneNumberPlaceHolder(
            country.iso2.toUpperCase() as CC
          );
      }

      this.allCountries.push(country);
    });
    this.allCountriesData = this.allCountries;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }

  writeValue(value: any): void {
    if (value) {
      this.numberInstance = parsePhoneNumberFromString(value);
      if (this.numberInstance) {
        const countryCode = this.numberInstance.country;
        this.phoneNumber = this.formattedPhoneNumber as NationalNumber;
        if (!countryCode) {
          return;
        }
        setTimeout(() => {
          this.selectedCountry = this.getCountry(countryCode);
          if (
            this.selectedCountry.dialCode &&
            !this.preferredCountries?.includes(this.selectedCountry.iso2)
          ) {
            this.preferredCountriesInDropDown.push(this.selectedCountry);
          }
          this.countryChanged.emit(this.selectedCountry);

          // Initial value is set
          this._changeDetectorRef.markForCheck();
          this.stateChanges.next(undefined);
        }, 1);
      } else {
        this.phoneNumber = value;
      }
    }

    // Value is set from outside using setValue()
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }

  get empty(): boolean {
    return !this.phoneNumber;
  }

  @HostBinding('class.ngx-floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder || '';
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next(undefined);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next(undefined);
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next(undefined);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  reset(): void {
    this.phoneNumber = '' as NationalNumber;
    this.propagateChange(null);

    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  private get formattedPhoneNumber(): string {
    if (!this.numberInstance) {
      return this.phoneNumber?.toString() || '';
    }
    switch (this.format) {
      case 'national':
        return this.numberInstance.formatNational();
      case 'international':
        return this.numberInstance.formatInternational();
      default:
        return this.numberInstance.nationalNumber.toString();
    }
  }

  private formatAsYouTypeIfEnabled(): void {
    if (this.format === 'default') {
      return;
    }
    const asYouType: AsYouType = new AsYouType(
      this.selectedCountry?.iso2.toUpperCase() as CC
    );
    // To avoid caret positioning we apply formatting only if the caret is at the end:
    if (
      this.phoneNumber
        ?.toString()
        .startsWith(this.previousFormattedNumber || '')
    ) {
      this.phoneNumber = asYouType.input(this.phoneNumber.toString()) as NationalNumber;
    }
    this.previousFormattedNumber = this.phoneNumber?.toString();
  }

  onChange: Function = () => { };

  inputChange(event: string): void {
    this.searchCriteria = event;
    this.onChange(this.searchCriteria);
  }

}
