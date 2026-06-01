import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WindowRefModule } from '../../core/window-ref/window-ref.module';
import { DxDropdownDividerDirective } from './dropdown-divider.directive';
import { DropDownMenuItemDirective } from './dropdown-item.directive';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownAppendToBodyComponent } from './dropdown.component';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule, OverlayModule, WindowRefModule],
  exports: [
    DropDownDirective,
    DropDownMenuItemDirective,
    DropDownMenuDirective,
    DropDownToggleDirective,
    DxDropdownDividerDirective,
    DropDownAppendToBodyComponent,
  ],
  declarations: [
    DropDownDirective,
    DropDownMenuItemDirective,
    DropDownMenuDirective,
    DropDownToggleDirective,
    DxDropdownDividerDirective,
    DropDownAppendToBodyComponent,
  ],
})
export class DropDownModule { }
