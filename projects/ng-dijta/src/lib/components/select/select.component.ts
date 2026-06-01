import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ScrollStrategy,
  ScrollStrategyOptions,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { differenceBy, isEqual } from 'lodash';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { WindowRef } from '../../core/window-ref';
import { fadeInOut } from '../../core/animation/fade-in-out';
import { WithConfig } from '../../utils';
import { addClassToOrigin, removeClassFromOrigin, formWithDropDown } from '../../utils/cdk-origin-handler';
import { AppendToBodyDirection, AppendToBodyScrollStrategyType, AppendToBodyDirectionsConfig } from '../../utils/cdk-overlay-config.type';

@Component({
  selector: 'd-select',
  templateUrl: './select.component.html',
  exportAs: 'select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  animations: [fadeInOut],
  preserveWhitespaces: false,
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() options = [];
  @Input() isSearch = false;
  @Input() toggleOnFocus = false;
  @Input() scrollHight = '300px';
  @Input() highlightItemClass = 'active';
  @Input() filterKey!: string;
  @Input() valueKey!: string;
  @Input() multiple!: boolean;
  @Input() isSelectAll = false;
  @Input() readonly = true;
  @Input() size!: '' | 'sm' | 'lg';
  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() appendToBodyScrollStrategy!: AppendToBodyScrollStrategyType;
  @Input() width!: number;
  @Input() templateItemSize!: number;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() searchPlaceholder = '';
  @Input() searchFn!: (term: string) => Observable<Array<{ id: string | number; option: any }>>;
  @Input() valueParser: (item: any) => any;
  @Input() formatter: (item: any) => string;
  @Input() direction: 'up' | 'down' | 'auto' = 'down';
  @Input() overview: 'border' | 'underlined' = 'border';
  @Input() allowClear = false;
  @Input() color;
  @Input() enableLazyLoad = false;
  @Input() virtualScroll;
  @Input() inputItemTemplate!: TemplateRef<any>;
  @Input() extraConfig!: {
    labelization?: {
      enable: boolean;
      overflow?: 'normal' | 'scroll-y' | 'multiple-line' | string;
      containerMaxHeight?: string;
      /**
       * @deprecated
       */
      containnerMaxHeight?: string;
      labelMaxWidth?: string;
      maxTags?: number;
    };
    selectedItemWithTemplate?: {
      enable: boolean;
    };
    enableFocusFirstFilteredOption?: boolean;
    [feature: string]: any;
  };

  @Input() optionDisabledKey = '';
  @Input() optionImmutableKey = '';
  @Input() noResultItemTemplate!: TemplateRef<any>;
  @Input() keepMultipleOrder: 'origin' | 'user-select' = 'user-select';
  @Input() customViewTemplate!: TemplateRef<any>;
  @Input() customViewDirection: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @Input() autoScrollIntoActive = false;
  @Input() autoFocus = false;
  @Input() notAutoScroll = false;
  @Input() loadingTemplateRef!: TemplateRef<any>;
  @Input() showItemTitle = false;
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @Input() beforeChange!: (index, option, action) => boolean | Promise<boolean> | Observable<boolean>;

  @Output() toggleChange = new EventEmitter<boolean>();
  @Output() loadMore = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;
  @ViewChild('selectWrapper', { static: true }) selectWrapper!: ElementRef;
  @ViewChild('selectInput') selectInputElement!: ElementRef;
  @ViewChild('selectMenu') selectMenuElement!: ElementRef;
  @ViewChild('selectBox', { static: true }) selectBoxElement!: ElementRef;
  @ViewChild('selectInputWithTemplate') selectInputWithTemplateElement!: ElementRef;
  @ViewChild('selectInputWithLabel') selectInputWithLabelElement!: ElementRef;
  @ViewChild('filterInput') filterInputElement!: ElementRef;
  @ViewChild('dropdownUl') dropdownUl!: ElementRef;
  @ViewChild(CdkConnectedOverlay) connectedOverlay!: CdkConnectedOverlay;
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport!: CdkVirtualScrollViewport;
  @HostBinding('class.dx-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }

  set isOpen(value) {
    this._isOpen = value;
    this.toggleChange.emit(value);
    this.setDocumentClickListener();
    if (this.selectWrapper) {
      this.dropDownWidth = this.width ? this.width : this.selectWrapper.nativeElement.offsetWidth;
    }
    if (value) {
      addClassToOrigin(this.selectWrapper);
      setTimeout(() => {
        this.startAnimation = true;
        this.changeDetectorRef.detectChanges();
        this.resetScrollTop();
      });
    } else {
      this.resetScrollTop(true);
      removeClassFromOrigin(this.selectWrapper);
      this.onTouch();
      if (this.direction === 'auto') {
        this.clearText();
      }
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  get isClearIconShow() {
    return this.allowClear && !this.multiple && !this.disabled && this.value;
  }

  get showMoreTags() {
    return this.multiItems.length > (this.extraConfig?.labelization?.maxTags || 40) && this.isSelectAll && this.virtualScroll;
  }

  get moreTagsNum() {
    return `+${this.multiItems.length - 1}`;
  }

  _inputValue: any;
  _isOpen = false;
  allChecked = false;
  halfChecked = false;
  isMouseEvent = false;
  showLoading = false;
  startAnimation = false;
  availableOptions: any[] = [];
  multiItems: any[] = [];
  value: any;
  filter = '';
  activeIndex = -1;
  selectIndex = -1;
  popDirection!: 'top' | 'bottom';
  menuPosition: VerticalConnectionPos = 'bottom';
  i18nSubscription!: Subscription;
  document: Document;
  dropDownWidth!: number;
  scrollHeightNum!: number;
  lastCloseScrollHeight!: number;
  minBuffer!: number;
  maxBuffer!: number;
  scrollStrategy: ScrollStrategy;
  cdkConnectedOverlayOrigin!: CdkOverlayOrigin;
  overlayPositions!: Array<ConnectedPosition> | undefined;
  virtualScrollViewportSizeMightChange = false;
  virtualScrollItemSize: any = {
    sm: 30,
    normal: 36,
    lg: 50,
    space: 4,
  };
  ANIMATION_DELAY = 300;

  get showSelectAll() {
    return this.isSelectAll && this.multiple && this.availableOptions.length > 0;
  }

  private sourceSubscription!: BehaviorSubject<any>;
  private filterSubscription!: Subscription;
  private resetting = false;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private scrollStrategyOption: ScrollStrategyOptions
  ) {
    this.valueParser = (item) => this.getValue(item, this.filterKey);
    this.formatter = (item) => this.getValue(item, this.filterKey);
    this.scrollStrategy = this.scrollStrategyOption.reposition();
    this.document = this.doc;
  }

  ngOnInit(): void {
    if (!this.searchFn) {
      this.searchFn = (term: any) => {
        return of(
          (this.options || [])
            .map((option, index) => ({ option: option, id: index }))
            .filter((item) => this.formatter(item.option).toLowerCase().indexOf(term.toLowerCase()) !== -1)
        );
      };
    }

    if (!this.multiple) {
      this.isSelectAll = false;
    }
    this.registerFilterChange();
    this.setPositions();
  }

  ngAfterViewInit() {
    if (this.autoFocus && this.selectBoxElement) {
      setTimeout(() => {
        this.selectBoxElement.nativeElement.focus({
          preventScroll: this.notAutoScroll,
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    this.document.removeEventListener('click', this.onDocumentClick);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { searchFn, options, appendToBodyDirections, appendToBodyScrollStrategy, disabled } = changes;
    if (searchFn || options) {
      this.resetSource();
      if (this.virtualScroll && this.virtualScrollViewport) {
        this.virtualScrollViewportSizeMightChange = true;
        this.virtualScrollViewport.checkViewportSize();
      }
    }
    if (appendToBodyDirections) {
      this.setPositions();
    }
    if (appendToBodyScrollStrategy && this.appendToBodyScrollStrategy) {
      const func = this.scrollStrategyOption[this.appendToBodyScrollStrategy];
      this.scrollStrategy = func();
    }
    if (disabled && this.isOpen) {
      this.toggle();
    }
  }

  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.overlayPositions = this.appendToBodyDirections
        .map((position) => {
          if (typeof position === 'string') {
            return AppendToBodyDirectionsConfig[position];
          } else {
            return position;
          }
        })
        .filter((position) => position !== undefined);
    } else {
      this.overlayPositions = undefined;
    }
  }


  getVirtualScrollHeight(len, size): string {
    if (len > 0) {
      let height =
        (this.templateItemSize || this.virtualScrollItemSize[size || 'normal']) * len + this.virtualScrollItemSize.space * (len - 1);
      if (this.isSelectAll && this.multiple) {
        height += this.virtualScrollItemSize[size ? size : 'normal'] + this.virtualScrollItemSize.space;
      }
      const scrollHeight = parseInt(this.scrollHight, 10);
      this.scrollHeightNum = height > scrollHeight ? scrollHeight : height;
      return `${this.scrollHeightNum}px`;
    }
    return '';
  }

  get realVirtualScrollItemSize() {
    const itemSize = (this.templateItemSize || this.virtualScrollItemSize[this.size || 'normal']) + this.virtualScrollItemSize.space;
    const num = Math.round(this.scrollHeightNum / itemSize) || 10;
    this.minBuffer = num * 1.5 * itemSize;
    this.maxBuffer = num * 2.5 * itemSize;
    return itemSize;
  }

  resetSource() {
    if (this.sourceSubscription && (this.searchFn as any)) {
      this.resetting = true;
      this.sourceSubscription.next('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerFilterChange(): void {
    this.sourceSubscription = new BehaviorSubject<any>('');
    this.sourceSubscription.pipe(switchMap((term) => this.searchFn(term))).subscribe((options: any) => {
      this.availableOptions = options;
      this.setAvailableOptions();
      this.setAllChecked();
      this.changeDetectorRef.markForCheck();
      if (this.appendToBody) {
        setTimeout(() => {
          if (this.connectedOverlay && this.connectedOverlay.overlayRef) {
            this.connectedOverlay.overlayRef.updatePosition();
          }
        });
      }
      if (
        !this.multiple &&
        (!this.value || (this.availableOptions && !this.availableOptions.find((option: any) => option?.option === this.value)))
      ) {
        this.selectIndex = this.filter && this.availableOptions && this.availableOptions.length > 0 ? 0 : -1;
      }
    });

    this.sourceSubscription.subscribe((term) => {
      if (this.resetting && term === '') {
        this.writeValue(this.value);
        this.resetting = false;
      }
    });

    this.searchInputValueChangeEvent();
  }

  searchInputValueChangeEvent() {
    if (this.isSearch && this.isOpen && this.filterInputElement) {
      this.filterInputElement.nativeElement.focus();
      if (!this.filterSubscription || this.appendToBody) {
        this.filterSubscription = fromEvent(this.filterInputElement.nativeElement, 'input')
          .pipe(
            map((e: any) => e.target.value),
            filter((term) => !this.disabled && (this.searchFn as any) && term.length >= 0),
            debounceTime(this.ANIMATION_DELAY)
          )
          .subscribe((term) => {
            this.selectIndex = -1;
            return this.sourceSubscription.next(term);
          });
      }
    }
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.value = value ?? [];
      if (this.showMoreTags) {
        this.value = this.value || [];
        this.value = Array.isArray(this.value) ? this.value : [this.value];
      } else {
        this.getMultipleSelectedOption();
        this.setAllChecked();
      }
    } else {
      this.value = value ?? '';
      this.getSingleSelectedOption();
      if (this.autoScrollIntoActive) {
        this.scrollIntoActive();
      }
    }
    this.writeIntoInput(this.value);
    this.changeDetectorRef.markForCheck();
  }

  writeIntoInput(value): void {
    let valueItem = value;
    if (this.valueKey) {
      valueItem = this.multiple ? this.multiItems.map((item: any) => item.option) : this.getOption(this.availableOptions, value, true);
      valueItem = valueItem ?? '';
    }
    this._inputValue = this.multiple ? (valueItem || []).map((option) => this.valueParser(option)).join(', ') : this.valueParser(valueItem);
    this.setAvailableOptions();
    if (this.showMoreTags) {
      this.multiItems = this.availableOptions.filter((item: any) => item.isChecked);
      this.setAllChecked();
    }
  }

  setAvailableOptions() {
    if (!this.value || !Array.isArray(this.availableOptions)) {
      return;
    }
    let _value = this.value;
    if (!this.multiple) {
      _value = [_value];
    }
    this.availableOptions = this.availableOptions.map((item: any) => ({
      isChecked: _value.findIndex((i) => isEqual(i, this.valueKey ? item.option[this.valueKey] : item.option)) > -1,
      id: item.id,
      option: item.option,
    }));
  }

  getMultipleSelectedOption() {
    this.value = this.value || [];
    this.value = Array.isArray(this.value) ? this.value : [this.value];
    this.multiItems = this.valueKey
      ? this.value.map((value) => this.getOption(this.availableOptions, value)).filter((item) => item)
      : this.value.map((option) => ({ option: option, id: this.getOptionIndex(option) }));
  }

  getSingleSelectedOption() {
    const selectedItem = this.valueKey
      ? this.getOption(this.availableOptions, this.value)
      : this.availableOptions.find((item) => this.formatter(item.option) === this.formatter(this.value));
    this.activeIndex = selectedItem ? selectedItem.id : -1;
    this.selectIndex = this.activeIndex ? this.activeIndex : -1;
  }

  getOption(data, value, hasOption?) {
    const hasValue = (value ?? undefined) !== undefined;
    const valueItem = this.getValue(value, this.valueKey);
    const result = hasValue ? data.find((item) => this.getValue(item.option, this.valueKey) === valueItem) || '' : '';
    return hasOption && result ? result.option : result;
  }

  getOptionIndex(option) {
    return this.options?.length
      ? this.options.findIndex((item) => isEqual(item, option))
      : this.availableOptions.findIndex((item) => isEqual(item.option, option));
  }

  getValue = (item, key) => {
    let result = item ?? '';
    if (typeof item === 'object') {
      result = item[key] ?? '';
    }
    return String(result);
  };

  scrollIntoActive() {
    if (this.activeIndex >= 0) {
      setTimeout(() => {
        const items = this.dropdownUl?.nativeElement.querySelectorAll('.dx-dropdown-item') || [];
        if (items[this.activeIndex]) {
          items[this.activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }, this.ANIMATION_DELAY);
    }
  }

  canChange(option, index, action: string): Promise<boolean> {
    let changeResult: Promise<boolean> = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(index, option, action);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result.then(value => value !== undefined ? value : false);
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise().then(value => value !== undefined ? value : false);
        } else {
          changeResult = Promise.resolve(result !== undefined ? result : false);
        }
      }
    }

    return changeResult;
  }

  choose = (option, index, $event?: Event, operate?: string) => {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (typeof option === 'object') {
      if (Object.keys(option).length === 0 || this.disabled) {
        this.isOpen = false;
        return;
      }
    } else {
      if (this.disabled) {
        this.isOpen = false;
        return;
      }
    }

    if (this.optionDisabledKey && option[this.optionDisabledKey]) {
      return;
    }

    if (this.optionImmutableKey && option[this.optionImmutableKey]) {
      return;
    }

    this.canChange(option, index, operate || 'select').then((change) => {
      if (!change) {
        return;
      }
      if (this.multiple) {
        const indexOfOption = this.multiItems.findIndex((item) => isEqual(item.option, option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: index, option });
        } else {
          this.multiItems.splice(indexOfOption, 1);
        }
        if (this.keepMultipleOrder === 'origin') {
          this.multiItems.sort((a, b) => a.id - b.id);
        }
        this.value = this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.multiItems.map((item) => item.option);
        this.setAllChecked();
      } else {
        this.value = this.valueKey ? option[this.valueKey] : option;
        this.activeIndex = index;
        this.selectIndex = index;
        this.toggle();
      }
      this.writeIntoInput(this.value);
      this.onChange(this.value);
      this.valueChange.emit(option);
    });
  };

  updateCdkConnectedOverlayOrigin() {
    if (this.selectWrapper.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.selectWrapper) || this.selectWrapper.nativeElement);
    }
  }

  resetScrollTop(isClose = false) {
    const menuDom = this.selectMenuElement?.nativeElement.querySelector('ul.dx-select-list-unstyled.dx-scrollbar');
    if (this.enableLazyLoad && menuDom) {
      if (isClose) {
        this.lastCloseScrollHeight = menuDom.scrollHeight ?? 0;
      } else if (menuDom.scrollHeight < this.lastCloseScrollHeight) {
        menuDom.scrollTop = 0;
      }
    }
  }

  autoToggle($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.toggleOnFocus && !this.disabled && !this.isOpen && !this.isMouseEvent) {
      this.toggle();
    }
  }

  @HostListener('mousedown', ['$event'])
  public setMouseEventTrue(event) {
    this.isMouseEvent = true;
  }
  @HostListener('mouseup', ['$event'])
  public setMouseEventFalse(event) {
    this.isMouseEvent = false;
  }

  toggle() {
    if (this.disabled) {
      if (this.isOpen) {
        this.isOpen = false;
      }
      return;
    }

    if (!this.isOpen) {
      this.filter = '';
      this.resetSource();
      if (!this.appendToBody) {
        let direction = '';
        switch (this.direction) {
          case 'auto':
            direction = this.isBottomRectEnough() ? 'bottom' : 'top';
            break;
          case 'down':
            direction = 'bottom';
            break;
          case 'up':
            direction = 'top';
            break;
          default:
            direction = 'bottom';
        }
        this.popDirection = <any>direction;
      } else {
        this.updateCdkConnectedOverlayOrigin();
      }
    } else if (!this.showAnimation) {
      this.startAnimation = false;
    }
    this.isOpen = !this.isOpen;
    if (this.virtualScrollViewportSizeMightChange) {
      setTimeout(() => {
        if (this.virtualScrollViewportSizeMightChange && this.virtualScrollViewport) {
          this.virtualScrollViewportSizeMightChange = false;
          this.virtualScrollViewport.checkViewportSize();
        }
      }, 0);
    }
    if (this.isSearch && this.isOpen) {
      setTimeout(() => this.searchInputValueChangeEvent(), 100);
    }
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectMenuElement.nativeElement;
    const selectInputElement = this.selectInputElement || this.selectInputWithLabelElement || this.selectInputWithTemplateElement;
    const displayStyle = selectMenuElement.style['display'] || (<any>window).getComputedStyle(selectMenuElement).display;
    let tempStyle;
    if (displayStyle === 'none') {
      tempStyle = {
        visibility: selectMenuElement.style.visibility,
        display: selectMenuElement.style.display,
        transform: selectMenuElement.style.transform,
      };
      this.renderer.setStyle(selectMenuElement, 'visibility', 'hidden');
      this.renderer.setStyle(selectMenuElement, 'display', 'block');
      this.renderer.setStyle(selectMenuElement, 'transform', 'translate(0, -9999)');
    }
    const elementHeight = selectMenuElement.offsetHeight;
    const bottomDistance = (this.windowRef.innerHeight ?? 0) - selectInputElement.nativeElement.getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (displayStyle === 'none') {
      this.renderer.setStyle(selectMenuElement, 'visibility', tempStyle.visibility);
      this.renderer.setStyle(selectMenuElement, 'display', tempStyle.display);
      this.renderer.setStyle(selectMenuElement, 'transform', tempStyle.transform);
    }
    return isBottomEnough;
  }

  setDocumentClickListener() {
    this.ngZone.runOutsideAngular(() => {
      if (this.isOpen) {
        this.document.addEventListener('click', this.onDocumentClick);
      } else {
        this.document.removeEventListener('click', this.onDocumentClick);
      }
    });
  }

  onDocumentClick = ($event: Event) => {
    if (this.isOpen && !this.selectBoxElement.nativeElement.contains($event.target)) {
      this.isOpen = false;
      this.selectIndex = this.activeIndex ? this.activeIndex : -1;
      this.changeDetectorRef.detectChanges();
    }
  };

  onEscKeyup($event) {
    if (this.isOpen) {
      $event.stopPropagation();
    }
    this.isOpen = false;
  }

  handleKeyUpEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex = this.selectIndex === 0 || this.selectIndex === -1 ? this.availableOptions.length - 1 : this.selectIndex - 1;
      this.scrollToActive();
    }
  }

  handleKeyDownEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex = this.selectIndex === this.availableOptions.length - 1 ? 0 : this.selectIndex + 1;
      this.scrollToActive();
    }
  }

  scrollToActive(): void {
    const that = this;
    setTimeout(() => {
      try {
        const selectIndex = that.selectIndex + (that.isSelectAll ? 1 : 0);
        const scrollPane: any = that.dropdownUl.nativeElement.children[selectIndex];
        if (scrollPane.scrollIntoViewIfNeeded) {
          scrollPane.scrollIntoViewIfNeeded(false);
        } else {
          const containerInfo = that.dropdownUl.nativeElement.getBoundingClientRect();
          const elementInfo = scrollPane.getBoundingClientRect();
          if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
            scrollPane.scrollIntoView(false);
          }
        }
      } catch (e) { }
    });
  }

  handleKeyEnterEvent($event, isSearchInput = false) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      const item = this.getSelectedItem();
      if (item) {
        this.choose(item.option, item.id, $event);
      } else if (!isSearchInput) {
        this.toggle();
      }
    } else {
      this.toggle();
    }
  }

  getSelectedItem = () => {
    return this.extraConfig?.enableFocusFirstFilteredOption && this.multiple && this.availableOptions.length
      ? this.availableOptions[0]
      : this.availableOptions[this.selectIndex];
  };

  removeItem(item, $event) {
    this.choose(item.option, item.id, $event, 'remove');
  }

  selectAll() {
    const mutableOption = this.optionImmutableKey
      ? this.availableOptions.filter((item) => !item.option[this.optionImmutableKey])
      : this.availableOptions;
    const selectedImmutableOption = this.optionImmutableKey ? this.multiItems.filter((item) => item.option[this.optionImmutableKey]) : [];
    const hasNotSelected = differenceBy(mutableOption, this.multiItems, 'id');

    if (hasNotSelected.length) {
      mutableOption.forEach((item) => {
        const indexOfOption = this.multiItems.findIndex((i) => isEqual(i.option, item.option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: item.id, option: item.option });
        }
      });
    } else if (mutableOption.length === this.multiItems.length - selectedImmutableOption.length) {
      this.multiItems = [...selectedImmutableOption];
    } else {
      this.multiItems = differenceBy(this.multiItems, mutableOption, 'id');
    }
    this.value = this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.multiItems.map((item) => item.option);
    this.writeIntoInput(this.value);
    this.setAllChecked();
    this.onChange(this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.value);
    this.valueChange.emit(this.multiItems);
  }

  trackByFn(index, item) {
    return index;
  }

  trackByOptionPointer(index, item) {
    return item.option;
  }

  loadMoreEvent(event) {
    this.showLoading = true;
    this.loadMore.emit({ instance: this, event: event });
  }

  loadFinish() {
    this.showLoading = false;
    this.changeDetectorRef.markForCheck();
  }

  loadStart() {
    this.showLoading = true;
    this.changeDetectorRef.markForCheck();
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    this.menuPosition = position.connectionPair.originY;
  }

  animationEnd($event) {
    if (!this.isOpen && this.selectMenuElement && this.showAnimation) {
      const targetElement = this.selectMenuElement.nativeElement;
      this.startAnimation = false;
      setTimeout(() => {
        this.renderer.setStyle(targetElement, 'display', 'none');
      });
    }
  }

  setAllChecked() {
    this.allChecked = false;
    this.halfChecked = false;
    if (!this.showSelectAll) {
      return;
    }
    if (!this.multiItems || this.multiItems.length === 0) {
      return;
    }
    const result = differenceBy(this.availableOptions, this.multiItems, 'id');
    if (result.length === 0) {
      this.allChecked = true;
    } else if (result.length === this.availableOptions.length) {
      this.allChecked = false;
    } else {
      this.halfChecked = true;
    }
  }

  public forceSearchNext() {
    this.sourceSubscription.next(this.filter);
  }

  valueClear($event) {
    $event.stopPropagation();
    this.value = null;
    this.resetStatus();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  resetStatus() {
    this.writeIntoInput('');
    if (this.availableOptions && this.availableOptions[this.activeIndex]) {
      this.availableOptions[this.activeIndex].isChecked = false;
    }
    this.activeIndex = -1;
    this.selectIndex = -1;
    this.changeDetectorRef.markForCheck();
  }

  clearText() {
    this.filter = '';
    this.forceSearchNext();
  }
}
