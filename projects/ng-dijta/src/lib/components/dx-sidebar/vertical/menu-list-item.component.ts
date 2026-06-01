import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { NavService } from './nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Menu } from '../model/model';
import { DynamicDatabase } from '../dynamic-database.service';
import { filter, first, Observable } from 'rxjs';
import { SubMenu } from '../model/menu';

@Component({
  selector: 'dx-menu-list-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.menu]="!vartical"
      [class.vartical]="vartical"
      [ngStyle]="{ 'padding-left': (depth - 1) * 5 + 'px' }"
    >
      <a
        (click)="onItemSelected(item, index)"
        [routerLink]="item?.route?.path"
        [ngClass]="{
          active: (labelIndex$ | async) === index
        }"
        [class.menu-item]="!vartical"
        [class.vartical-item]="vartical"
        class="d-flex a-inherit align-items-center cursor-pointer position-relative p-2 rounded gap-3 text-decoration-none w-100"
        routerLinkActive="active"
      >
        <mat-icon aria-hidden="false" [fontIcon]="item.icon"></mat-icon>
        <p class="subbody m-0">{{ item.label | transloco }}</p>
        @if (item.children && item.children.length) {
        <span class="position-absolute end-0 me-1">
          <mat-icon [@indicatorRotate]="expanded ? 'expanded' : 'collapsed'">
            expand_more
          </mat-icon>
        </span>
        }
      </a>
      @if (expanded) { @if(item.isDisplay || disableDispalyConditions) {
      <ul class="ps-1 list-unstyled">
        @for (child of item.children; track $index; let j = $index) {
          <ng-container *ngIf="item.isDisplay || disableDispalyConditions">
            <li>
              <dx-menu-list-item
                (onMenuSelection)="onMenuSelection.emit()"
                [item]="child"
                [depth]="depth + 1"
                [index]="'child' + index + '' + j"
                [disableDispalyConditions]="disableDispalyConditions"
              >
              </dx-menu-list-item>
            </li>
          </ng-container>
        }
      </ul>
      } }
    </div>
  `,
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
  @Input() vartical: boolean = false;
  @Input() disableDispalyConditions: boolean = true;
  @Output() onMenuSelection: EventEmitter<void> = new EventEmitter<void>();
  currentUrl$!: Observable<string>;
  labelIndex$!: Observable<number>;
  childLabel$!: Observable<string>;


  constructor(
    public navService: NavService,
    public router: Router,
    private dynamicDatabase: DynamicDatabase
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.currentUrl$ = this.dynamicDatabase.currentUrl;
    this.labelIndex$ = this.dynamicDatabase.labelIndex;
    this.childLabel$ = this.dynamicDatabase.childLabelData;
    let ind = this.findMenuIndex(this.router.url).slice(-2)[0];
    if (ind) {
      this.dynamicDatabase.setLabelIndex(+ind);
    }
  }

  onItemSelected(item: Menu, ind: string | number) {

    if (typeof ind === 'number') {
      this.dynamicDatabase.setLabelIndex(ind);
    }
    if (typeof ind === 'string') {
      this.dynamicDatabase.setLabelIndex(+ind.slice(-2)[0]);
      this.dynamicDatabase.setChildLabel(ind);
    }
    if (item.route?.path) {
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          first()
        )
        .subscribe((_event) => {
          this.onMenuSelection.emit();
        });
      this.dynamicDatabase.setUrl(item.route?.path);
    } else if (!item.children || !item.children.length) {
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          first()
        )
        .subscribe((_event) => {
          this.onMenuSelection.emit();
        });
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
      } else if (this.list[i]?.route?.path === url) {
        return i + '';
      }
    }
    return '';
  }

  isActive(instruction: string): boolean {
    return this.router.isActive(instruction, {
      paths: 'exact',
      fragment: 'exact',
      matrixParams: 'ignored',
      queryParams: 'exact',
    } as IsActiveMatchOptions);
  }
}
