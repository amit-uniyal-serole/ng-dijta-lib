import {
    Directive,
    Input,
    ElementRef,
    forwardRef,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
    selector: '[appExpression]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExpressionDirective),
            multi: true
        }
    ]
})
export class ExpressionDirective implements ControlValueAccessor, OnChanges {
    // Bind an array of condition objects to the directive.
    @Input('appExpression') conditions: Array<{ logicalOperator: boolean }> = [];
    private onChange: (value: any) => void = () => { };
    private onTouched: () => void = () => { };
    private disabled = false;
    constructor(private el: ElementRef<HTMLInputElement>) { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conditions']) {
            this.updateExpression();
        }
    }
    // Called when the form control writes a value to the element.
    writeValue(value: any): void {
        // In our case the value is computed from conditions,
        // so we simply update the expression.
        this.updateExpression();
    }
    // Save the callback to propagate changes to the form control.
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.el.nativeElement.disabled = isDisabled;
    }
    // Compute the expression string and update both the view and form control.
    private updateExpression(): void {
        setTimeout(() => {
            const expr = this.createExpression(this.conditions);
            // Update the input element's value.
            this.el.nativeElement.value = expr;
            // Propagate the change to the Reactive Form.
            this.onChange(expr);
        });
    }
    // Build the expression string from the conditions array.
    private createExpression(conditions: Array<{ logicalOperator: boolean }>): string {
        if (!conditions || conditions.length === 0) {
            return '';
        }
        // Start with the first condition represented as "1"
        let expression = '1';
        // For each subsequent condition, combine the previous expression with the new one.
        for (let i = 1; i < conditions.length; i++) {
            // Use 'and' if the previous condition's logic is true; otherwise, 'or'
            const operator = conditions[i - 1].logicalOperator ? 'and' : 'or';
            expression = `(${expression}${operator}${i + 1})`;
        }
        return expression === '1' ? '' : expression;
    }
}