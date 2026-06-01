import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CascaderService } from './cascader.service';
import { CascaderItem } from './cascader.type';

@Component({
  selector: 'd-cascader-li',
  templateUrl: './cascader-li.component.html',
  styles: [
    `
    .loadMoreButton {
        width: 100%;
        position: fixed;
        bottom: 0px;
        border: none;
        background: var(--background-light);
        box-shadow: rgba(0, 0, 0, 0.05) 2px 0px 2px 0px;
    }
    `
  ]
})
export class CascaderLiComponent implements OnInit, OnDestroy {
  @Input() width = 200;
  @Input() trigger: 'click' | 'hover' = 'hover';
  @Input() option!: CascaderItem;
  @Input() multiple = false;
  @Input() canSelectParent = false;
  @Input() colIndex!: number;
  @Input() dropDownItemTemplate!: TemplateRef<any>;
  @Input() isLazyLoad!: boolean;
  @Input() isLoadMore!: boolean;
  @Input() checkboxRelation = { upward: true, downward: true };
  @Output() onRecordSelect: EventEmitter<void> = new EventEmitter<void>();
  isLoader$: Observable<boolean> = of(false)

  dropdownEl!: Element;
  isLeaf!: boolean;
  selected!: boolean;
  halfCheck!: boolean;
  active!: boolean;

  unsubscribe$ = new Subject<void>();

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    if (this.trigger === 'hover') {
      if (this.option.disabled) {
        return;
      }
      this.cascaderSrv.openColumn(this.option, this.colIndex, false);
    }
  }

  constructor(
    private cascaderSrv: CascaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.isLazyLoad) {
      this.isLeaf = !!this.option.isLeaf;
    } else {
      this.isLeaf = this.option.isLeaf || !(this.option.children && this.option.children.length);
    }
    this.isLoader$ = this.cascaderSrv.isLoading;
    this.initObserable();
  }

  initObserable(): void {
    this.cascaderSrv.resetStatus.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.selected = false;
      this.halfCheck = false;
      this.active = false;
    });
  }

  clickLeaf(): void {
    if (!this.option.disabled && !this.multiple) {
      this.cascaderSrv.openColumn(this.option, this.colIndex, false);
      this.option.active = true;
      this.cascaderSrv.setCurrentValue();
      this.cascaderSrv.closeAllDropdown();
    }
  }

  clickItem(): void {
    // if (this.option.disabled) {
    //   return;
    // }
    this.cascaderSrv.openColumn(this.option, this.colIndex, this.isLazyLoad);
    this.onRecordSelect.emit();
    if (this.canSelectParent && !this.multiple) {
      this.cascaderSrv.setCurrentValue();
    }
  }

  loadItem(): void {
    const option = this.cascaderSrv.getParentNode(this.option.value);
    this.cascaderSrv.openColumn(option, this.colIndex, this.isLazyLoad, false, true, true);
  }

  clickCheckbox(event: Event): void {
    let parentSelected = false;
    setTimeout(() => {

      if (this.option.disabled) {
        return;
      }
      event.stopPropagation();

      const status = !!this.option.halfChecked;
      this.cascaderSrv.updateOptionCheckedStatus(
        this.option.value,
        this.option.halfChecked ? false : !this.option.checked,
        this.checkboxRelation.upward,
        this.checkboxRelation.downward,
      );

      if (status) {
        this.option.halfChecked = false;
      }
      if (this.option?.value) {
        const parent = this.cascaderSrv.getParentNode(this.option?.value)
        parentSelected = parent.children?.every((item) => item.checked) ?? false;
      }
      if ((this.isLeaf || this.canSelectParent) && !parentSelected) {
        this.updateValue(this.option.checked);
      }
    }, 100);
  }

  avoidCheckboxChange(): boolean {
    return false;
  }

  updateValue(checked: boolean | undefined): void {
    if (checked !== undefined) {
      this.cascaderSrv.updateTagList.next({
        isAdd: checked,
        option: this.option,
        isEmit: true
      });
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
