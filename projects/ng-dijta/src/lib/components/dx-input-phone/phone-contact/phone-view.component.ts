import { Component, Input, OnChanges } from "@angular/core";
import { Country } from "./model/country.model";
import parsePhoneNumberFromString, { PhoneNumber } from "libphonenumber-js";

@Component({
    selector: 'dx-phone-view',
    template: `
        @if(this.phoneNumber) {
            <p class="country-selector dx-mat-tel-input-container align-items mb-0">
                <span class="d-inline-flex align-items-center">
                <span class="country-selector-flag flag" [ngClass]="numberInstance?.country"></span>
                <span>(+{{numberInstance?.countryCallingCode}}) {{numberInstance?.nationalNumber}}</span>
                </span>
            </p>
        } @else {
            -
        }
      
    `,
    styleUrls: ['./phone-contact.component.scss'],
})
export class PhoneViewComponent implements OnChanges {
    selectedCountry: Country | undefined;
    @Input() phoneNumber!: string;
    numberInstance: PhoneNumber | undefined;
    ngOnChanges(): void {
        if (this.phoneNumber) {
            this.numberInstance = parsePhoneNumberFromString(`${this.phoneNumber.includes('+') ? '' : '+'}${this.phoneNumber.toString()}`);
        }

    }
}