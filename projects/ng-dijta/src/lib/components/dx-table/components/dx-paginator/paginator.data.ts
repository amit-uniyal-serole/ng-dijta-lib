import { BulkActions } from '../../interfaces/dx-table.interface';

export class PaginatorData {
  static readonly PageSize: BulkActions = {
    label: '10',
    viewType: 'button',
    icon: 'expand_more',
    itemLabelAsMenuLabel: true,
    dropDownPanelWidth: 'fit-with-dropdown',
    hideMenuToolTip: true,
    show: true,
    isRectangularBtn: true,
  };
  static readonly defaultPageSizeDropdown = {
    defaultSize: '10',
    actions: [
      {
        type: '5',
        label: '5',
      },
      {
        type: '10',
        label: '10',
      },
      {
        type: '20',
        label: '20',
      },
      {
        type: '50',
        label: '50',
      },
      {
        type: '100',
        label: '100',
      },
    ],
  };
}
