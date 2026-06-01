import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {

    @Input() isCoordinate: boolean = false;
    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: Event) {
        const inputElement = this.el.nativeElement as HTMLInputElement;
        const inputValue = inputElement.value;
        const caretPosition = inputElement.selectionStart; // Get the current caret position
        let pattern = this.isCoordinate ? `/[^0-9.,+-]/g` : `/[^0-9.,]/g`;
        const sanitizedValue = inputValue.replace(pattern, ''); // Remove all non-numeric characters

        if (inputValue !== sanitizedValue) {
            inputElement.value = sanitizedValue; // Update the input value with the sanitized value

            // Restore the caret position after removing non-numeric characters
            const adjustedCaretPosition = caretPosition! - (inputValue.length - sanitizedValue.length);
            inputElement.setSelectionRange(adjustedCaretPosition, adjustedCaretPosition);

            inputElement.dispatchEvent(new Event('input')); // Trigger an input event to ensure the form model is updated
        }
    }
}
