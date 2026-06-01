import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'tab-cell',
  template: `
    <div class="position-relative">
    <d-tabs [(activeTab)]="tabActiveId" [scrollMode]="true">
      <d-tab *ngFor="let item of tabsDisplay" [id]="item.id">
        <ng-template dTabTitle>
          <span class="tab-configurable">{{ item.name }}</span>
        </ng-template>
      </d-tab>
    </d-tabs>
    <!-- <span
      class="more-tabs"
      dDropDown
      dDropDownToggle
      appendToBody
      [trigger]="'click'"
      [style.left.px]="leftOffset"
    >
      <span>more</span>
      <span class="material-icons-outlined">
        expand_more
        </span>
      <div dDropDownMenu>
        <ng-template
          [ngTemplateOutlet]="dropDownMenuTpl"
          [ngTemplateOutletContext]="{
            $implicit: this
          }"
        >
        </ng-template>
      </div>
    </span> -->
    <!-- <ng-template #dropDownMenuTpl>
      <div class="tabs-menu-container">
        <li
          *ngFor="let tab of tabsHidden"
          [class.menu-tab-active]="tab.id === tabActiveId"
          (click)="selectForConfigTab(tab.id)"
        >
          {{ tab.name }}
        </li>
      </div>
    </ng-template> -->
    </div>
    <!-- <pre>activeID: {{ tabActiveId | json }}</pre> -->
  `,
  styles: [
    `
      .tabs-menu-container {
        padding: 8px 0;
        max-width: 200px;
      }

      .tabs-menu-container li {
        padding: 0 16px;
        font-size: 12px;
        line-height: 36px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      .tabs-menu-container li:not(.menu-tab-active):hover {
        background: #fff;
        color: #000;
      }

      .tabs-menu-container li:hover a {
        text-decoration: none;
      }

      .tabs-menu-container li a {
        color: #000;
        line-height: 36px;
        width: 170px;
        display: inline-block;
      }

      a:focus {
        text-decoration: none;
      }

      .line {
        height: 1px;
        background: #ccc;
        margin-top: 10px;
        margin-bottom: 15px;
      }

      .more-tabs {
        margin-top: 0px;
        cursor: pointer;
        position: absolute;
        top: 0px;
        outline: none;
        line-height: 1;
        display: flex;
        align-items: center;
        font-size: 15px;
      }

      .menu-tab-active {
        background: var(--secondary-base);
        color: var(--secondary-on-base);
      }

      li {
        list-style: none;
      }

      .setting-container {
        display: flex;
        align-items: center;
      }

      pre {
        border: none;
      }

      .icon-chevron-down {
        position: relative;
        left: 4px;
        top: 2px;
      }
    `,
  ],
})
export class DxTableTabComponent {
  tabActiveId: string | number = 1;
  tabsDisplay = [
    {
      id: 1,
      name: 'Tab1',
      content: 'Tab1 Content',
    },
    {
      id: 2,
      name: 'Tab2',
      content: 'Tab2 Content',
    },
    {
      id: 3,
      name: 'Tab3',
      content: 'Tab3 Content',
    },
    {
        id: 4,
        name: 'Tab4',
        content: 'Tab4 Content',
      },
      {
        id: 5,
        name: 'Tab5',
        content: 'Tab5 Content',
      },
      {
        id: 6,
        name: 'Tab6',
        content: 'Tab6 Content',
      },
      {
        id: 7,
        name: 'Tab1',
        content: 'Tab1 Content',
      },
      {
        id: 8,
        name: 'Tab2',
        content: 'Tab2 Content',
      },
      {
        id: 9,
        name: 'Tab3',
        content: 'Tab3 Content',
      },
      {
          id: 10,
          name: 'Tab4',
          content: 'Tab4 Content',
        },
        {
          id: 11,
          name: 'Tab5',
          content: 'Tab5 Content',
        },
        {
          id: 12,
          name: 'Tab6',
          content: 'Tab6 Content',
        },
        {
            id: 13,
            name: 'Tab1',
            content: 'Tab1 Content',
          },
          {
            id: 14,
            name: 'Tab2',
            content: 'Tab2 Content',
          },
          {
            id: 15,
            name: 'Tab3',
            content: 'Tab3 Content',
          },
          {
              id: 16,
              name: 'Tab4',
              content: 'Tab4 Content',
            },
            {
              id: 17,
              name: 'Tab5',
              content: 'Tab5 Content',
            },
            {
              id: 18,
              name: 'Tab6',
              content: 'Tab6 Content',
            },
            {
              id: 19,
              name: 'Tab1',
              content: 'Tab1 Content',
            },
            {
              id: 20,
              name: 'Tab2',
              content: 'Tab2 Content',
            },
            {
              id: 21,
              name: 'Tab3',
              content: 'Tab3 Content',
            },
            {
                id: 22,
                name: 'Tab4',
                content: 'Tab4 Content',
              },
              {
                id: 23,
                name: 'Tab5',
                content: 'Tab5 Content',
              },
              {
                id: 24,
                name: 'Tab6',
                content: 'Tab6 Content',
              },
  ];
  leftOffset = 200;

  constructor(private el: ElementRef, private changeRef: ChangeDetectorRef) {}

  getLeftOffset() {
    this.leftOffset = 0;
    this.el.nativeElement
      .querySelectorAll('.tab-configurable')
      .forEach((element) => {
        this.leftOffset += element.offsetWidth + 32;
      });
  }

  selectForConfigTab(id: number) {
    this.tabActiveId = id;
  }
}
