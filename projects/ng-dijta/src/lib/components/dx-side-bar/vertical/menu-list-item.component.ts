import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { NavService } from './nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Menu } from '../model';
import { DynamicDatabase } from '../dynamic-database.service';
import { Observable } from 'rxjs';
import { SubMenu } from '../model/menu';

@Component({
  selector: 'dx-menu-list-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      mat-list-item
      [ngStyle]="{ 'padding-left': depth * 12 + 'px' }"
      (click)="onItemSelected(item,index)"
      routerLinkActive="active"
      [routerLink]="item?.route?.path"
      [ngClass]="{
        expanded: (labelIndex$ | async) === index
      }"
      class="menu-list-item"
    >
      <span class="routeIcon material-icons">{{ item.icon }}</span>
      <p class="subbody  m-0">{{ item.label | transloco }}</p>
      <span fxFlex *ngIf="item.children && item.children.length">
        <span fxFlex></span>
        <mat-icon
          class="updown"
          [@indicatorRotate]="expanded ? 'expanded' : 'collapsed'"
        >
          expand_more
        </mat-icon>
      </span>
    </a>
    <div *ngIf="expanded">
    <ng-container *ngIf="item.isDisplay || disableDispalyConditions">
      <dx-menu-list-item
        *ngFor="let child of item.children; let j=index"
        [item]="child"
        [depth]="depth + 1"
        [index]="'child'+index+''+j"
        [disableDispalyConditions]="disableDispalyConditions"
      >
      </dx-menu-list-item>
      </ng-container>
    </div>
  `,
  styleUrls: ['./_vertical.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit {
  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: Menu;
  @Input() depth: number = 1;
  @Input() index!: number;
  @Input() list: SubMenu[] = [];
  @Input() disableDispalyConditions: boolean = true;

  currentUrl$!: Observable<string>;
  labelIndex$!: Observable<number>;
  childLabel$!: Observable<string>;

  constructor(public navService: NavService, public router: Router, private dynamicDatabase: DynamicDatabase) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.currentUrl$ = this.dynamicDatabase.currentUrl
    this.labelIndex$ = this.dynamicDatabase.labelIndex
    this.childLabel$ = this.dynamicDatabase.childLabelData
    let ind = this.findMenuIndex(this.router.url).slice(-2)[0]
    if (ind) {
      this.dynamicDatabase.setLabelIndex(+ind)
    }
  }

  onItemSelected(item: Menu, ind: string | number) {
    if (typeof ind === 'number') {
      this.dynamicDatabase.setLabelIndex(ind)
    }
    if (typeof ind === 'string') {
      this.dynamicDatabase.setLabelIndex(+ind.slice(-2)[0])
      this.dynamicDatabase.setChildLabel(ind)
    }
    if (item.route?.path) {
      this.dynamicDatabase.setUrl(item.route?.path)
    }
    if (!item.children || !item.children.length) {
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  findMenuIndex(url): string {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i]?.children) {
        for (let j = 0; j < this.list[i]?.children?.length!; j++) {
          if (this.list[i]?.children?.[j].route?.path === url) {
            return 'child' + i + '' + j;
          }
        }
      }
      else if (this.list[i]?.route?.path === url) {
        return i + ''
      }
    }
    return '';
  }

  isActive(instruction: string): boolean {
    return this.router.isActive(instruction, {
      paths: 'exact',
      fragment: 'exact',
      matrixParams: 'ignored',
      queryParams: 'exact'
    } as IsActiveMatchOptions)
  }
}
