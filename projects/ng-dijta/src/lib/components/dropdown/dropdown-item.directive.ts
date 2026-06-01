import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DropDownDirective } from './dropdown.directive';

@Directive({
  selector: '[dDropDownMenuItem]',
  exportAs: 'd-dropdown-menu-item',
})
export class DropDownMenuItemDirective {
  @HostBinding('class.dx-dropdown-item') itemClass = true;
  @HostBinding('attr.role') role = 'menuitem';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @HostBinding('class.disabled')
  get disabledClass(): boolean {
    return this._disabled;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): string | null {
    return this._disabled ? 'true' : null;
  }

  @HostBinding('attr.tabindex')
  get tabIndex(): number {
    return this._disabled ? -1 : 0;
  }

  constructor(@Optional() @SkipSelf() private readonly dropdown: DropDownDirective | null) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this._disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (this.dropdown?.clickHide) {
      this.dropdown.isOpen = false;
      return;
    }
    // clickHide === false: prevent the document-level close handler
    // (closeScope='all' by default) from seeing this click and shutting the
    // panel.
    event.stopPropagation();
  }
}
