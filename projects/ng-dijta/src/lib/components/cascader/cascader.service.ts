import { Injectable, OnDestroy } from '@angular/core';
import { cloneDeep, isEqual, some } from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CascaderItem } from './cascader.type';
import { uniq } from 'lodash';

@Injectable()
export class CascaderService implements OnDestroy {

  _currentValue: Array<string | number | undefined> = [];

  multipleValue: Array<string | number>[] = [];

  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading:Observable<boolean> = this.loader.asObservable();

  options!: CascaderItem[];

  columnList: CascaderItem[][] = [];
  searchResultList: any = [];

  canSelectParent = false;

  isMultiple = false;

  isLazyLoad = false;
  lazyloadCache = {};
  checkboxRelation = { upward: true, downward: true };

  loadChildrenFn!: (value: CascaderItem) => Promise<CascaderItem[]> | Observable<CascaderItem[]>;

  set currentValue(value: Array<string | number | undefined>) {
    this._currentValue = value.filter(item => item !== undefined);
    this.currentValueChange.next(this._currentValue);
  }

  get currentValue() {
    return this._currentValue;
  }

  set currentMultipleValue(value) {
    this.resetNodeStatus();
    this.multipleValue = value;
  }

  get currentMultipleValue() {
    this.multipleValue = [];
    this.getMultipleValue([], this.options);
    return this.multipleValue;
  }

  readonly closeMianDropdown = new Subject<void>();
  readonly currentValueChange = new Subject<Array<string | number | undefined>>();
  readonly resetStatus = new Subject<void>();
  readonly openDrawer = new Subject<void>();
  readonly updateShowText = new Subject<void>();
  readonly updateTagList = new Subject<{
    isAdd: boolean;
    option: CascaderItem;
    isEmit: boolean;
  }>();

  initOptions(options: CascaderItem[]): void {
    this.columnList = [];
    this.options = cloneDeep(options);
    this.options.forEach(t => { t['isRoot'] = true; });
    this.columnList.push(this.options);
  }

  openColumn(option: CascaderItem, colIndex: number, islazyLoad: boolean, reload = false, isEdit?: boolean, loadMore?: boolean): void {
    this.clearTargetActive(this.columnList[colIndex].find(t => t.active));
    option.active = true;
    this.columnList.splice(colIndex + 1);

    if (option.children && option.children.length && !loadMore) {
      this.columnList.push(option.children);
      this.openDrawer.next();
    } else if (islazyLoad) {
      option._loading = true;
      this.loader.next(true);
      option.pageNo =  option.pageNo !== undefined ? option.pageNo + 1:  0;
      const fn = this.loadChildrenFn(option);

      if ((fn as Promise<CascaderItem[]>).then) {
        (fn as Promise<CascaderItem[]>).then(res => {
          this.loader.next(false);
          this.columnList.splice(colIndex + 1);
          if(loadMore) {
            option.children?.push(...res);
          } else {
            option.children = res || [];
          }
         
          option._loading = false;
          this.columnList.push(res || []);
          
          this.openDrawer.next();
          if (this.isMultiple) {
            const checkedValue = isEdit ? false : option.checked ?? false
            this.updateOptionCheckedStatus(option.value, checkedValue, true, true, !reload, false);
          }
          if (reload) {
            if (!this.isMultiple) {
              this.updateOptionByValue();
            }
            this.updateShowText.next();
          }
        });
      } else {
        (fn as Observable<CascaderItem[]>).subscribe(res => {
          this.columnList.splice(colIndex + 1);
          option.children = res || [];
          option._loading = false;
          this.columnList.push(res || []);
          this.openDrawer.next();

          if (this.isMultiple) {
            this.updateOptionCheckedStatus(option.value, option.checked ?? false, true, true, !reload);
          }

          if (reload) {
            if (!this.isMultiple) {
              this.updateOptionByValue();
            }
            this.updateShowText.next();
          }
        });
      }
    }
  }

  clearTargetActive(option: CascaderItem | undefined): void {
    if (!option) {
      return;
    }
    option.active = false;
    if (option.children) {
      this.clearTargetActive(option.children.find(t => t.active));
    }
  }

  setCurrentValue(): void {
    this.currentValue = this.columnList.map(listItem => listItem.find(optionItem => optionItem.active)?.value);
  }

  updateOptionByValue(): void {
    this.resetNodeStatus();
    this.columnList = [this.options];
    for (let index = 0; index < this.currentValue.length; index++) {
      const target = this.columnList[index]?.find(listItem => listItem.value === this.currentValue[index]);

      if (target) {
        target['active'] = true;
        if (target.children && target.children.length) {
          this.columnList.push(target.children);
        } else if (this.isLazyLoad) {
          this.openColumn(target, index, !target.isLeaf, !target.isLeaf);
          break;
        }
      } else {
        break;
      }
    }
  }

  lazyloadMultipleChild(target: CascaderItem, index: number, isEdit?: boolean) {
    if (!this.lazyloadCache[target.value]) {
      this.lazyloadCache[target.value] = true;
      this.openColumn(target, index, true, true, isEdit);
    }
  }

  resetNodeStatus(option: CascaderItem[] = this.options): void {
    option.forEach(item => {
      item['active'] = false;
      item['checked'] = false;
      item['halfChecked'] = false;
      if (item.children) {
        this.resetNodeStatus(item.children);
      }
    });
  }

  updateOptionCheckedStatus(targetValue: string | number, checked: boolean, upward = true, downward = true, isEmit = true, isTemporary?: boolean): void {

    let targetNode = this.options.find(t => t.value === targetValue);
    let parentSelected = false;
    if (targetNode) {
      targetNode['checked'] = checked;
      targetNode['halfChecked'] = false;
      if (targetNode.children && downward) {
        this.updateChildrenChecked(targetNode, checked, isEmit, isTemporary);
      }
    } else {
      const parentNode = this.getParentNode(targetValue);
      targetNode = parentNode?.children?.find(t => t.value === targetValue);
      if (targetNode) {
        targetNode['checked'] = checked;
        targetNode['halfChecked'] = false;
      }
      if (upward) {
        this.updateParentChecked(parentNode, isEmit);
      }

      if (targetNode?.children && downward) {
        this.updateChildrenChecked(targetNode, checked, isEmit);
      }
    }
  }

  updateChildrenChecked(node: CascaderItem, checked: boolean, isEmit: boolean, isTemporary?: boolean) {
    let hasDisable = false;
    node.children?.forEach(child => {
      if (!child.disabled) {
        child['checked'] = checked;
        child['halfChecked'] = false;
        if (child.children && child.children.length) {
          if (this.canSelectParent) {
            this.updateTagList.next({
              isAdd: checked,
              option: child,
              isEmit
            });
          }
          this.updateChildrenChecked(child, checked, isEmit);
        } else {
          this.updateTagList.next({
            isAdd: isTemporary !== undefined ? isTemporary : checked,
            option: child,
            isEmit
          });
        }
      } else {
        hasDisable = true;
      }
    });
    if (node.children?.every((item) => item.checked)) {
      node.children?.forEach((val) => {
        this.updateTagList.next({
          isAdd: false,
          option: val,
          isEmit
        });
      })
    } else {
      node.children?.forEach((val) => {
        this.updateTagList.next({
          isAdd: val['checked'] ?? false,
          option: val,
          isEmit
        });
      })
    }
    if (hasDisable && !this.canSelectParent) {
      this.updateParentChecked(node, isEmit);
    }
  }

  updateParentChecked(node: CascaderItem, isEmit: boolean) {
    const checkedChild = node.children?.find(t => t['checked']);
    const halfcheckedChild = node.children?.find(t => t['halfChecked']);
    const uncheckedChild = node.children?.find(t => !t['halfChecked'] && !t['checked']);

    if (halfcheckedChild || (checkedChild && uncheckedChild)) {
      node['checked'] = false;
      node['halfChecked'] = true;
    } else if (!checkedChild && !halfcheckedChild) {
      node['checked'] = false;
      node['halfChecked'] = false;
    } else {
      node['checked'] = true;
      node['halfChecked'] = false;
    }
    if (node.children?.every((item) => item.checked)) {
      node.children?.forEach((val) => {
        this.updateTagList.next({
          isAdd: false,
          option: val,
          isEmit
        });
      })
    } else {
      node.children?.forEach((val) => {
        this.updateTagList.next({
          isAdd: val['checked'] ?? false,
          option: val,
          isEmit
        });
      })
    }

    if (this.canSelectParent) {
      this.updateTagList.next({
        isAdd: node['checked'],
        option: node,
        isEmit
      });
    }

    if (!node['isRoot']) {
      this.updateParentChecked(this.getParentNode(node.value), isEmit);
    }
  }

  getParentNode(childValue: string | number): CascaderItem {
    const queue = [...this.options];
    let cur: CascaderItem | any;
    while (queue.length) {
      cur = queue.shift();
      if (cur.children && cur.children.find(t => t.value === childValue)) {
        break;
      } else if (cur.children) {
        queue.push(...cur.children);
      }
    }
    return cur;
  }

  getMultipleValue(value, option: CascaderItem[]): void {
    const isNoRelation = !this.checkboxRelation.downward || !this.checkboxRelation.upward;
    option.forEach(item => {
      const _value = [...value];
      if (!item.isRoot && !this.getParentNode(item.value).checked) {

        _value.push(`${item.type}:${item.value}`);
      }
      if (item.isRoot) {
        _value.push(`${item.type}:${item.value}`);
      }
      if (item.children && item.children.length && (item.checked || item.halfChecked)) {
        this.getMultipleValue(_value, item.children);
        if (isNoRelation) {
          this.multipleValue.push(_value);
        }
      } else if (item.checked) {
        if (!some(this.multipleValue, (item) => isEqual(item, _value))) {
          this.multipleValue.push(_value);
        }

      } else if (isNoRelation && item.children?.length) {
        this.getMultipleValue(_value, item.children);
      }
    });

  }

  closeAllDropdown(): void {
    this.closeMianDropdown.next();
  }

  searchByString(str: string, currentlabel?: string, currentValue: Array<string | number> = [], list = this.options): void {
    list.forEach(item => {
      const label = currentlabel ? currentlabel + ' / ' + item.label : item.label;
      const valueList = [...currentValue, item.value];
      if (item.children && item.children.length) {
        this.searchByString(str, label, valueList, item.children);
      } else {
        if (!item.disabled && label.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          this.searchResultList.push({
            label,
            valueList,
            checked: item.checked
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.closeMianDropdown.complete();
    this.currentValueChange.complete();
    this.updateTagList.complete();
    this.resetStatus.complete();
    this.openDrawer.complete();
  }

}
