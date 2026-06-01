## Selector for dx-input-datepicker
`<dx-input-datepicker></dx-input-datepicker>`

## Module
`DxInputDatePickerModule`
## Usage inside form
```
<form [formGroup]="userForm">
    <dx-input-datepicker disabled="false" formControlName="datepicker" [minDate]="minDate" [maxDate]="maxDate">
            <dx-hint>
                This show how hint will work
            </dx-hint>
        <dx-suffix></dx-suffix>
            <dx-error  *ngIf="userForm.controls['datepicker'].required && userForm.controls['datepicker'].errors &&userForm.controls['datepicker'].touched">Dob is Required</dx-error>
            <dx-error  *ngIf="userForm.controls['datepicker'].invalid">Enter valid datepicker</dx-error>
    </dx-input-datepicker>
</form>

```    
## Inputs

| Input  | Data need to be passed as input |
| ------------- | ------------- |
| **disabled** (boolean) | `pass boolean value to enable or disable field (default value false)`  |
| **formControlName** (string)  | `form control datepicker of form group` |
| **outline** ('floating' | 'none-floating' | 'outer-label')  | `To Change Outline of input (default value none-floating)` |
| **placeholder** (string)  | `pass placeholder to be displayed (default value - Select Date)` |
| **minDate** (Date)  | `pass minDate for validation` |
| **maxDate** (Date)  | `pass maxDate for validation` |
## Import CUSTOM_ELEMENTS_SCHEMA 

`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`

>Include  **schemas: [CUSTOM_ELEMENTS_SCHEMA]** in module file if  **dx-label**, **dx-hint**, **dx-suffix**,  **dx-prefix** and **dx-error**  gives error as they custom elements using as ng-content
     
![Variant](./result.png)  
          
        
      