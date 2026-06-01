import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, SubMenu, SUB_MENU_TYPE } from './model';



@Component({
  selector: 'dx-side-bar',
  templateUrl: './dx-side-bar.component.html',
  styleUrls: ['./dx-side-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          width: '240px',
        })
      ),
      state(
        'out',
        style({
          width: '0px', // new change
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('slideInOutTwo', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('rotatedState', [
      state('in', style({ transform: 'rotate(0)' })),
      state('out', style({ transform: 'rotate(-180deg)' })),
      transition('out => in', animate('400ms ease-out')),
      transition('in => out', animate('400ms ease-in')),
    ]),
  ],
})
export class DxSideBarComponent implements OnChanges {
  @Input() logo: any;
  subMenu: SUB_MENU_TYPE = 'out';
  @Input() menu: Menu[] = [];
  @Output() sidebarToggle: EventEmitter<SUB_MENU_TYPE> = new EventEmitter<SUB_MENU_TYPE>();
  currentRoute: string = ''
  constructor(private router: Router) { }
  activeMenu: string = '';
  submenuMenu: string = '';
  subMenuList: SubMenu[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menu.currentValue && changes.menu.previousValue) {
      if (this.menu && this.menu.length > 0) {
        this.getActiveRouter()
      }
    }
  }

  onMenu(code: Menu): void {
    if (code.children && code.children.length > 0) {
      this.subMenuList = code.children;
      this.subMenu = 'in'
    } else {
      this.subMenu = 'out'
    }
    this.sidebarToggle.emit(this.subMenu);
    this.activeMenu = code.code ?? '';
  }
  onSubMenu(code: SubMenu): void {
    this.submenuMenu = code.code ?? '';
    this.toggle();
  }
  getActiveRouter(): void {
    this.currentRoute = this.router.url;
    this.menu.forEach((m: Menu) => {
      if (m.children && m.children.length) {
        m.children.forEach((c: SubMenu) => {
          if (this.router.url.includes(c?.route?.path!)) {
            this.activeMenu = c.parentId ?? '';
            this.subMenuList = m.children ?? [];
            this.submenuMenu = c.code ?? ''
            this.toggle();
          }
        })
      }
    })
  }
  toggle(): void {
    this.subMenu = this.subMenu === 'out' ? 'in' : 'out';
    this.sidebarToggle.emit(this.subMenu);
  }
}
