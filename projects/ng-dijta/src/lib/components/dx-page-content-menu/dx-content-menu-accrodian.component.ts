import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentMenu } from '../dx-page-content-menu/model/pagecontent.model';

@Component({
  selector: 'dx-content-menu-accrodian',
  templateUrl: './dx-content-menu-accrodian.component.html',
  styleUrls: ['./dx-content-menu-accrodian.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapse',
        style({
          height: 0,
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
        })
      ),
      state(
        'expand',
        style({
          overflow: 'hidden',
          padding: ' 9px 30px'
        })
      ),
      transition('collapse<=>expand', animate('200ms')),
    ]),
    trigger('rotate', [
      state(
        'default',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state('rotated', style({ transform: 'rotate(-90deg)' })),
      transition('default<=>rotated', animate('200ms')),
    ]),
  ]
})
export class DxContentMenuAccrodianComponent {
  //To hold item of menulist
  @Input() item!: ContentMenu;
  //To show content of childmenu
  @Input() showContent = false;
  //To emit an event when we click on menu
  @Output() onClickMenu: EventEmitter<ContentMenu> = new EventEmitter<ContentMenu>()
  //To emit onclickmenu event when we click on menu item
  onClickMenuItem(event: ContentMenu): void {
    this.showContent = !this.showContent;
    this.onClickMenu.emit(event);
  }

}
