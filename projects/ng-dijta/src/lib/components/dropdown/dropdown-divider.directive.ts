import { Directive, HostBinding } from '@angular/core';

/**
 * Non-interactive separator inside a `[dDropDownMenu]`. Equivalent to ng-zorro's
 * `<li nz-menu-divider>`.
 *
 * @example
 * ```html
 * <ul dDropDownMenu>
 *   <li dDropDownMenuItem>Edit</li>
 *   <li dxDropdownDivider></li>
 *   <li dDropDownMenuItem>Delete</li>
 * </ul>
 * ```
 */
@Directive({
  selector: '[dxDropdownDivider]',
  exportAs: 'dxDropdownDivider',
})
export class DxDropdownDividerDirective {
  @HostBinding('class.dx-dropdown-divider') readonly dividerClass = true;
  @HostBinding('attr.role') readonly role = 'separator';
  @HostBinding('attr.aria-orientation') readonly ariaOrientation = 'horizontal';
}
