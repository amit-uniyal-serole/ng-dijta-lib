import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {  NavigationMenuConfig, NavigationMenuChildren, DxNavigationMenu } from './model/dx-navigation-menu.model';

@Component({
  selector: 'dx-navigation-menu',
  templateUrl: './dx-navigation-menu.component.html',
})
export class DxNavigationMenuComponent {
  @Input() menu: DxNavigationMenu[] = [];
  @Input() config!: NavigationMenuConfig;
  @Output() onClickMenu: EventEmitter<NavigationMenuChildren> =
    new EventEmitter<NavigationMenuChildren>();

  onClickMenuItem(event: NavigationMenuChildren): void {
    this.onClickMenu.emit(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['menu']?.previousValue !== changes?.['menu']?.currentValue) {
      this.menu = this.menu;
    }
  }
}
