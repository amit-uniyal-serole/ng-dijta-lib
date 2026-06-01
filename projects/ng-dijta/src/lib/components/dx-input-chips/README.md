## Selector for dx-input-email
`<dx-input-email></dx-input-email>`

## Module
`DxInputEmailModule`
## Usage inside form
```
<form [formGroup]="userForm">
    <dx-input-email (blur)="blur()"  disabled="false" formControlName="email" placeholder="Primary Email" pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' icon="contact_mail">
            <dx-hint>
                This show how hint will work
            </dx-hint>
        <dx-suffix></dx-suffix>
            <dx-error  *ngIf="userForm.controls['email'].required && userForm.controls['email'].errors &&userForm.controls['email'].touched">Email is Required</dx-error>
            <dx-error  *ngIf="userForm.controls['email'].invalid">Enter valid email</dx-error>
    </dx-input-email>
</form>

```    
## Inputs

| Input  | Data need to be passed as input |
| ------------- | ------------- |
| **disabled** (boolean) | `pass boolean value to enable or disable field (default value false)`  |

| **noneLabel** (boolean) | `pass boolean value to enable or disable label (default value false)`  |
| **mask** (string) | `Pass your mask`  |
| **formControlName** (string)  | `form control name of form group` |
| **outline** ('floating' | 'none-floating' | 'outer-label')  | `To Change Outline of input (default value none-floating)` |
| **placeholder** (string)  | `pass placeholder to be displayed (default value - Email)` |
| **pattern** (string)  | `pass regex pattern to validate (default value - /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)` |
| **icon** (string)  | `pass icon to be displayed (default value - mail)` |

## Import CUSTOM_ELEMENTS_SCHEMA 

`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`

>Include  **schemas: [CUSTOM_ELEMENTS_SCHEMA]** in module file if  **dx-label**, **dx-hint**, **dx-suffix**,  **dx-prefix** and **dx-error**  gives error as they custom elements using as ng-content
     
![Variant](./result.png)  
          
        
      