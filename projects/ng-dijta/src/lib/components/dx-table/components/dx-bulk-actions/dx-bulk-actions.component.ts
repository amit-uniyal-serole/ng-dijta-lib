import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CustomLabelColor } from '../../../dx-button/dx-button.model';
import {
  BULK_ACTION_FILTER_TYPE,
  BulkActionGroups,
  BulkActions,
  BulkActionSubMenu,
  MenuAction,
  MultiActionButtonSettings,
  SubmenuActionModel,
} from '../../interfaces/dx-table.interface';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
export type DROPDOWN_PANEL_WIDTH = 'fit-with-dropdown';
interface PanelWidth {
  ['min-width']: string;
  ['max-width']: string;
}
@Component({
  selector: 'dx-bulk-actions',
  templateUrl: './dx-bulk-actions.component.html',
  styleUrls: ['./dx-bulk-actions.component.scss'],
})
export class DxBulkActionsComponent<T> implements OnInit, OnChanges {
  @Input() data: T | undefined;
  @Input() bulkAction!: BulkActions;
  @Output() onClickBulkMenuAction: EventEmitter<MenuAction> =
    new EventEmitter<MenuAction>();
  @Output() onBulkActionSubMenuClick: EventEmitter<SubmenuActionModel> =
    new EventEmitter<SubmenuActionModel>();
  @Output() onClickCreateCustomView: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() onSearchBulkActionMenu: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onClickMarkAsDefault: EventEmitter<MenuAction> =
    new EventEmitter<MenuAction>();
  bulkActionMenuLabel!: string | undefined;
  filteredBulkActionsList: MenuAction[] | undefined = [];
  filteredGroupsList: ReplaySubject<BulkActionGroups[]> = new ReplaySubject<BulkActionGroups[]>(1);
  bulkActionsList: MenuAction[] | undefined = [];
  groupsList: BulkActionGroups[] | undefined = [];
  searchText!: string;
  isOpen = false;
  panelWidth: string | number = 'auto';
  @ViewChild('button') button!: MatButton;
  readonly _elementRef: ElementRef | undefined;

  ngOnInit(): void {
    this.setPaginatorDropdownLabel(this.bulkAction?.label);
    this.setInitialActive()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.bulkAction?.previousValue != changes?.bulkAction?.currentValue
    ) {
      this.bulkAction = this.bulkAction;
      this.bulkActionsList = this.bulkAction.actions ?? [];
      this.filteredBulkActionsList = this.bulkActionsList ?? [];
      this.groupsList = this.bulkAction.groups ?? [];

      this.filteredGroupsList.next(this.copyGroupOptions(this.groupsList));

      this.bulkAction.createNewAction = {
        ...this.bulkAction?.createNewAction,
        label: this.bulkAction?.createNewAction?.label ?? 'New Custom View',
      };
      this.setPaginatorDropdownLabel(this.bulkAction?.label);
      this.setInitialActive();
    }
  }
  fillLabelColor(color: string): CustomLabelColor {
    const customColor: CustomLabelColor = {
      color: color,
    };
    return customColor;
  }
  private setInitialActive(): void {
    if (!this.groupsList?.length) return;
    const actions = this.groupsList.flatMap(group => group.actions ?? []);
    actions.forEach(action => (action.active = false));
    const defaultAction =
      actions.find(action => action.label === this.bulkActionMenuLabel) ||
      actions.find(action => action.active)
    if (defaultAction) {
      defaultAction.active = true;
      this.bulkActionMenuLabel = defaultAction.label;
    }
  }
  bulkActionMenuClick(event: MenuAction): void {
    this.groupsList?.forEach(group =>
      group.actions?.forEach(action => (action.active = false))
    );
    event.active = true;
    this.isOpen = false;
    if (this.bulkAction?.itemLabelAsMenuLabel) {
      this.setPaginatorDropdownLabel(event?.label);
    }
    this.onClickBulkMenuAction?.emit(event);
  }
  onClickSubMenu(parentMenuType: string, menu: BulkActionSubMenu): void {
    const payload: SubmenuActionModel = {
      parentMenuType: parentMenuType,
      subMenuType: menu?.type,
      name: menu?.name
    };
    this.onBulkActionSubMenuClick?.emit(payload!);
  }
  setPaginatorDropdownLabel(label: string | undefined): void {
    this.bulkActionMenuLabel = label;
  }
  styles(dropDownPanelWidth: DROPDOWN_PANEL_WIDTH): PanelWidth | undefined {
    if (dropDownPanelWidth === 'fit-with-dropdown') {
      const panelStyles: PanelWidth = {
        ['min-width']: '100%',
        ['max-width']: '100%',
      };
      return panelStyles;
    } else {
      return undefined;
    }
  }
  onBtnSingleEvent(event: MultiActionButtonSettings): void {
    this.isOpen = false;
    this.onClickBulkMenuAction.emit({
      label: event?.title!,
      type: event?.type,
    });
  }
  onBtnMultiEvent(event: string): void {
    this.isOpen = false;
    this.onClickBulkMenuAction.emit({
      label: event!,
      type: event,
    });
  }
  changeOrder(): boolean {
    return this.bulkAction?.menuPosition === 'left-to-right';
  }
  clickCreateCustomView(): void {
    this.onClickCreateCustomView.emit();
  }
  onChangeBulkActionSearch(
    event: HTMLInputElement,
    type: BULK_ACTION_FILTER_TYPE
  ): void {
    let value: string = event['target']?.value;
    this.searchText = value;
    if (type === 'local-filter') {
      if (!this.bulkAction?.searchByGroup) {
        if (!value) {
          this.filteredBulkActionsList = this.bulkActionsList;
        }
        this.filteredBulkActionsList = Object.assign(
          [],
          this.bulkActionsList
        )?.filter(
          (item: MenuAction) =>
            (item?.label ?? '')?.toLowerCase().indexOf(value?.toLowerCase()) > -1
        );
      } else {
        this.filterBankGroups();
      }
    } else {
      this.onSearchBulkActionMenu.emit(value);
    }
  }

  emptyRecordsMessage(): boolean | undefined {
    return (
      this.bulkAction?.filter &&
      this.filteredBulkActionsList &&
      this.filteredBulkActionsList?.length <= 0 &&
      !this.bulkAction?.loading &&
      this.bulkActionsList &&
      this.bulkActionsList?.length > 0
    );
  }

  //group
  protected filterBankGroups(): void {
    if (!this.groupsList) {
      return;
    }
    // get the search keyword
    let search = this.searchText;
    const groupOptionsCopy = this.copyGroupOptions(this.groupsList);
    if (!search) {
      this.filteredGroupsList.next(groupOptionsCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredGroupsList.next(
      groupOptionsCopy.filter((bankGroup: BulkActionGroups) => {
        const showBankGroup = bankGroup?.title?.toLowerCase()?.indexOf(search)! > -1;
        if (!showBankGroup) {
          bankGroup.actions = bankGroup?.actions?.filter(bank => (bank?.label ?? '').toLowerCase().indexOf(search) > -1);
        }
        return bankGroup?.actions?.length! > 0;
      })
    );
  }

  protected copyGroupOptions(optionGroups: BulkActionGroups[]): BulkActionGroups[] {
    const optionGroupsCopy: BulkActionGroups[] = [];
    optionGroups.forEach(optionGroup => {
      optionGroupsCopy.push({
        title: optionGroup?.title,
        errorMessage: optionGroup?.errorMessage,
        actions: optionGroup?.actions?.slice()
      });
    });
    return optionGroupsCopy;
  }
  onMarkAsDefault(event: MenuAction): void {
    this.onClickMarkAsDefault.emit(event)
  }
  openOption(): void {
    this.isOpen = true;
    this.panelWidth = this._getOverlayWidth(this.button._elementRef);
  }
  /** Gets how wide the overlay panel should be. */
  private _getOverlayWidth(
    preferredOrigin: ElementRef<ElementRef> | CdkOverlayOrigin | undefined,
  ): string | number {
    if (this.panelWidth === 'auto') {
      const refToMeasure =
        preferredOrigin instanceof CdkOverlayOrigin
          ? preferredOrigin.elementRef
          : preferredOrigin || this._elementRef;
      return refToMeasure?.nativeElement.getBoundingClientRect().width;
    }

    return this.panelWidth === null ? '' : this.panelWidth;
  }
}
