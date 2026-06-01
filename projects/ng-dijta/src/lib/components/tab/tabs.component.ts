import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
  } from '@angular/core';
  import { sum } from 'lodash';
  import { Observable } from 'rxjs';
  import { NgxTabComponent } from './tab.component';
  
  export interface ITabOperation {
    id: number | string | undefined;
    operation: string;
  }
  
  @Component({
    selector: 'd-tabs',
    templateUrl: './tabs.component.html',
    exportAs: 'tabs',
    preserveWhitespaces: false,
  })
  export class NgxTabsComponent implements OnChanges, AfterViewInit {
    static ID_SEED = 0;
    @ViewChild('tabsEle')
      tabsEle!: ElementRef;
    @ViewChild('tabsViewport')
      tabsViewport!: ElementRef;
    @Input() type: 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider' = 'tabs';
    @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
    @Input() showContent = true;
    @Input() scrollMode: boolean | 'normal' | 'auto' = false;
    @Input()
      activeTab!: number | string;
    @Input()
      customWidth!: string;
    @Input() reactivable = false;
    @Input() closeable = false;
    @Input() closeableIds = [];
    @Input() addable = false;
    @Input()
      addTabTpl!: TemplateRef<any>;
    /**
     * @todo
     * 待重新设计
     */
    @Input() vertical = false;
    /**
     * @deprecated
     * class设置无需内层，外层即可
     */
    @Input()
      cssClass!: string;
    @Input() isHidden = false;
    @Input()
      beforeChange!: (currentValue, previousValue) => boolean | Promise<boolean> | Observable<boolean>;
    @ContentChildren(NgxTabComponent)
      tabs!: QueryList<NgxTabComponent>;
    @Output() activeTabChange = new EventEmitter<number | string>();
    @Output() addOrDeleteTabChange = new EventEmitter<ITabOperation>();
    id: string;
    offsetIndex = 0;
    offsetLeft!: number;
    offsetWidth!: number;
    scrollModeToggle = false;
    tabsWidth: any[] = [];
    ARROW_DROPDOWN_WIDTH = 128; 
  
    get isShowShadow() {
      return this.scrollModeToggle && ['tabs', 'pills', 'wrapped'].includes(this.type);
    }
  
    constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
      this.id = `ngxTabs${NgxTabsComponent.ID_SEED++}`;
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      const { activeTab, scrollMode } = changes;
      if (scrollMode) {
        this.getTabsWidth();
      }
      if (activeTab) {
        this.changeActiveSlidingBlock();
        if (this.scrollModeToggle && this.tabsEle && this.tabs) {
          const tabs = this.tabsEle.nativeElement.querySelectorAll('li.ngx-nav-tab-item');
          const index = Array.from(this.tabs).findIndex((item) => item.id === this.activeTab);
          this.offsetIndex = index;
          this.scrollIntoView(tabs[index]);
        }
      }
    }
  
    ngAfterViewInit(): void {
      if (this.tabs.length) {
        if (this.activeTab === undefined) {
          const tabCom: NgxTabComponent | undefined = this.tabs.find((item) => !item.disabled);
          if(tabCom?.id) {
            this.select(tabCom?.id);
          }
        } else {
          this.changeActiveSlidingBlock();
        }
      }
      this.getTabsWidth();
      this.tabs.changes.subscribe(() => {
        this.changeActiveSlidingBlock();
        setTimeout(() => this.getTabsWidth());
      });
    }
  
    changeActiveSlidingBlock(): void {
      if (this.type === 'slider' && this.tabsEle) {
        setTimeout(() => {
          const tabEle = this.tabsEle.nativeElement.querySelector(`#${this.id} li.active`);
          if (tabEle) {
            const leftFix = this.scrollModeToggle ? this.tabsEle.nativeElement.scrollLeft : 0;
            this.offsetLeft = tabEle.getBoundingClientRect().left + leftFix - this.tabsEle.nativeElement.getBoundingClientRect().left;
            this.offsetWidth = tabEle.getBoundingClientRect().width;
            this.cdr.detectChanges();
          }
        });
      }
    }
  
    canChange(currentTab: number | string): Promise<boolean> {
      let changeResult = Promise.resolve(true);
  
      if (this.beforeChange) {
        const result: any = this.beforeChange(currentTab, this.activeTab);
        if (typeof result !== 'undefined') {
          if (result.then) {
            changeResult = result;
          } else if (result.subscribe) {
            changeResult = changeResult = (result as Observable<boolean>).toPromise().then(value => value !== undefined ? value : false);
          } else {
            changeResult = Promise.resolve(result);
          }
        }
      }
  
      return changeResult;
    }
  
    select(id: number | string, callback?: Function): void {
      if (!this.reactivable && this.activeTab === id) {
        return;
      }
      this.canChange(id).then((change) => {
        if (!change) {
          return;
        }
        const tab = this.tabs.find((item) => item.id === id);
        if (tab && !tab.disabled) {
          this.activeTab = id;
          this.changeActiveSlidingBlock();
          if (callback) {
            callback();
          }
          this.activeTabChange.emit(id);
        }
      });
    }
  
    addOrDeleteTab(event: Event, id?: number | string): void {
      event.stopPropagation();
      const operation = id || id === 0 ? 'delete' : 'add';
      this.addOrDeleteTabChange.emit({ id, operation });
    }
  
    getTabsWidth(): void {
      if (this.scrollMode && this.tabsViewport && this.tabsEle) {
        let tabsWidthSum = 0;
        const tabs = this.tabsEle.nativeElement.querySelectorAll('li.ngx-nav-tab-item');
        this.tabsWidth = [];
        tabs.forEach((tab) => {
          let width = tab.offsetWidth;
          const style = getComputedStyle(tab);
          const marginLeft = parseFloat(style.marginLeft);
          const marginRight = parseFloat(style.marginRight);
          width += marginLeft > 0 ? marginLeft : 0;
          width += marginRight > 0 ? marginRight : 0;
          tabsWidthSum += width;
          this.tabsWidth.push(width);
        });
        setTimeout(() => {
          const fixWidth = this.el.nativeElement.clientWidth - this.ARROW_DROPDOWN_WIDTH;
          this.scrollModeToggle = this.scrollMode === 'auto' ? tabsWidthSum > fixWidth : !!this.scrollMode;
          if (this.scrollModeToggle && this.activeTab && this.tabs) {
            const data = this.tabs.toArray();
            const index = data.findIndex((item) => item.id === this.activeTab);
            const tab = data[index];
            this.scroll(undefined, index, tab, true);
          }
        });
      }
    }
  
    scroll(direction?: string, index?: number, tab?: NgxTabComponent, isInitScrollMode?: boolean): void {
      if (this.scrollModeToggle && this.tabsEle) {
        const tabs = this.tabsEle.nativeElement.querySelectorAll('li.ngx-nav-tab-item');
        const containerWidth = this.tabsEle.nativeElement.scrollWidth;
        const scrollLeft = this.tabsEle.nativeElement.scrollLeft;
        const viewportWidth = this.tabsViewport.nativeElement.offsetWidth;
        if (direction) {
          const distance = direction === 'next' ? scrollLeft + viewportWidth : scrollLeft - viewportWidth;
          let width = 0;
          for (let i = 0; i < this.tabsWidth.length; i++) {
            width += this.tabsWidth[i];
            if (width >= distance) {
              this.offsetIndex = i === 0 ? 0 : direction === 'next' ? (containerWidth - width < viewportWidth ? tabs.length - 1 : i) : i + 1;
              break;
            }
          }
          this.scrollIntoView(tabs[this.offsetIndex]);
        } else if (index !== undefined && index >= 0 && tab) {
          const toIndexArr = this.tabsWidth.slice(0, index);
          const width = sum(toIndexArr);
          const fixIndex = index === 0 ? 0 : containerWidth - width < viewportWidth ? tabs.length - 1 : index;
          const dom = tabs[fixIndex];
          this.offsetIndex = fixIndex;
          if (isInitScrollMode) {
            setTimeout(() => this.scrollIntoView(dom));
          } else {
            this.select(tab.id, () => this.scrollIntoView(dom));
          }
        }
      }
    }
  
    scrollIntoView(dom: HTMLElement): void {
      if (dom) {
        dom.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }