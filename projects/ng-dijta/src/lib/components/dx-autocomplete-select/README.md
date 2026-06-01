## Selector

`<dx-autocomplete-select></dx-autocomplete-select>`

## Module

`DxAutocompleteSelectModule`

## Usage inside form

```
<form [formGroup]="userForm">
   <dx-autocomplete-select (onSelectChange)="autoCompleteChange($event)" showToolTip="true"
           formControlName="country" [options]="country">
          <dx-label>Country</dx-label>
    <dx-error *ngIf="userForm.controls['country'].invalid && userForm.controls['country'].errors &&userForm.controls['country'].touched">Please Select valid Country</dx-error>
        </dx-autocomplete-select>
</form>

```

## Inputs

| Input                         | Data need to be passed as input                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| **loading** (boolean)         | `loader on options dropdown`                                                              |
| **required** (boolean)        | `required field `                                                                         |
| **options** (KeyValueModel[]) | `select options`                                                                          |
| **formControlName** (string)  | `form control name of form group`                                                         |
| **disabled** (boolean)        | `disable field`                                                                           |
| **showToolTip** (boolean)     | `tooltip for options(Helpful when text is large)`                                         |
| **country** (boolean)         | `show flags for countries using two letter country code(we can use it for country field)` |

## Import CUSTOM_ELEMENTS_SCHEMA

`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`

> Include **schemas: [CUSTOM_ELEMENTS_SCHEMA]** in module file if **dx-autocomplete-label** and **dx-autocomplete-error** gives error as they custom elements using as ng-content
