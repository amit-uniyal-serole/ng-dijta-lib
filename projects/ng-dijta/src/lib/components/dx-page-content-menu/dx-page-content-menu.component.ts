import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ContentMenu } from './model/pagecontent.model';
@Component({
  selector: 'dx-page-content-menu',
  templateUrl: './dx-page-content-menu.component.html',
  styleUrls: ['./dx-page-content-menu.component.scss']
})
export class DxPageContentMenuComponent implements OnChanges {
  //To hold title of page menu
  @Input('menuTitle') title!: string;
  //To hold list of menu
  @Input() menuList: ContentMenu[] = [];
  //To emit an event when we click on menu
  @Output() onClickMenu: EventEmitter<ContentMenu> = new EventEmitter<ContentMenu>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['menuList']?.previousValue !== changes?.['menuList']?.currentValue) {
      this.menuList = changes?.['menuList']?.currentValue
    }
  }

  //To emit onclickmenu event when we click on menu item
  onClickMenuItem(event: ContentMenu): void {
    this.onClickMenu.emit(event);
  }
}
