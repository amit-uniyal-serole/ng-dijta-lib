import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from './button.component';
import { LoadingModule } from '../../loading';
import { AutoFocusDirective } from './auto-focus.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, LoadingModule, MatIconModule],
  exports: [ButtonComponent, ButtonGroupComponent, AutoFocusDirective],
  declarations: [ButtonComponent, ButtonGroupComponent, AutoFocusDirective],
  providers: [],
})
export class ButtonModule {
}
