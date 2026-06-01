## Selector for dx-input
`<dx-tag-input></dx-tag-input>`

## Module
`DxInputModule`
## Usage inside form
```
<form [formGroup]="userForm">
     <dx-tag-input type="text" [formControl]="fcr">
        <dx-prefix>
          +91
        </dx-prefix>
        <dx-label>Tag</dx-label>
        <dx-hint>
          This show how hint will work
        </dx-hint>
        <dx-suffix>
          Code
        </dx-suffix>
        <dx-error *ngIf="fcr?.errors && fcr?.touched">
          This field is required
        </dx-error>
    </dx-tag-input>
</form>

```    
`**Note**: It is mandatory to use dxLabel Directive with element tag to display label outside field e.g: <div dxLabel>Description</div>`    
## Inputs

| Input  | Data need to be passed as input |
| ------------- | ------------- |
| **disabled** (boolean) | `pass boolean value to enable or disable field (default value false)`  |
| **noneLabel** (boolean) | `pass boolean value to enable or disable label (default value false)`  |
| **type** (INPUT_TYPE: 'text' | 'number') | `type of input `  |
| **formControlName** (string)  | `form control name of form group` |
| **outline** ('floating' | 'none-floating' | 'outer-label')  | `To Change Outline of input (default value none-floating)` |
| **labelPosition** ('left' or 'top')  | `To Change Outer Label position   (default value top)` |
| **minLength** (number)  | `To set minlength of input value` |
| **maxLength** (number)  | `To set maxlength of input value` |
| **availableTag** (string)  | `To set pattern for input value` |
## Import CUSTOM_ELEMENTS_SCHEMA 

`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`

>Include  **schemas: [CUSTOM_ELEMENTS_SCHEMA]** in module file if  **dx-label**, **dx-hint**, **dx-suffix**,  **dx-prefix** and **dx-error**  gives error as they custom elements using as ng-content
     
![Variant](./result.png)     
          
        
      