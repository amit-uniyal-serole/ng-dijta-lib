import { Component } from '@angular/core';
import {
  DxTableColumn,
  DxTableSetting,
} from 'projects/ng-dijta/src/lib/components/dx-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
})
export class Table {
  columns: DxTableColumn<any>[] = [
    {
      field: 'name',
      columnDef: 'name',
      title: 'Account Name',
      type: 'link',
      sortable: true,
      sortMenu: {
        defaultDirection: 'asc',
        options: [
          {
            label: 'Sort A -> Z',
            direction: 'asc',
            icon: 'arrow_upward',
          },
          {
            label: 'Sort Z -> A',
            direction: 'desc',
            icon: 'arrow_downward',
          },
          {
            label: 'Clear sorting',
            direction: '',
            icon: 'close',
          },
        ],
      },
    },
    {
      field: 'industry',
      columnDef: 'industry',
      title: 'Industry',
      type: 'dropdown',
      progressBar: true,
      htmlView: false,
      sortable: true,
      sortMenu: {
        options: [
          {
            label: 'Sort A -> Z',
            direction: 'asc',
            icon: 'arrow_upward',
          },
          {
            label: 'Sort Z -> A',
            direction: 'desc',
            icon: 'arrow_downward',
          },
          {
            label: 'Clear sorting',
            direction: '',
            icon: 'close',
          },
        ],
      },
    },
    {
      field: 'type',
      columnDef: 'type',
      title: 'Account Type',
      type: 'dropdown',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'yearlyRevenue',
      columnDef: 'yearlyRevenue',
      title: 'Annual Revenue',
      type: 'currency',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'phoneDirect',
      columnDef: 'phoneDirect',
      title: 'Phone',
      type: 'contact',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'owner',
      columnDef: 'owner',
      title: 'Account Owner',
      type: 'lookup',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'status',
      columnDef: 'status',
      title: 'Status',
      type: 'dropdown',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'changedBy',
      columnDef: 'changedBy',
      title: 'Changed By',
      type: 'lookup',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'changedAt',
      columnDef: 'changedAt',
      title: 'Changed At',
      type: 'datetime',
      progressBar: true,
      htmlView: false,
      setting: { date: { dateAgo: true } },
    },
    {
      field: 'Tags',
      columnDef: 'Tags',
      title: 'Tags',
      type: 'tag',
      progressBar: true,
      htmlView: false,
    },
    {
      field: 'website',
      columnDef: 'website',
      title: 'Website',
      type: 'URL',
      progressBar: true,
      htmlView: false,
    },
    { type: 'menu', title: '', field: 'id', columnDef: 'id' },
  ];
  setting: any = {
    pageSize: 10,
    pageIndex: 0,
    pagination: true,
    paginationFirstLastButtons: true,
    totalItems: 22,
    enableRowClick: true,
    columnDefaultSorts: { name: 'asc' },
    multiActionButtonSettings: {
      type: 'addAccount',
      title: 'Add Account',
      show: true,
      multiActionDropDown: { show: true, menuList: [] },
    },
    leftActions: [
      { label: 'Refresh', icon: 'refresh', type: 'onRefresh' },
      {
        icon: 'filter_list',
        label: 'Filter',
        type: 'onFilterClick',
        viewType: 'button',
        color: '#1e49c7',
        active: false,
      },
      {
        icon: 'filter_alt_off',
        label: 'Clear Filter',
        type: 'clearFilter',
        viewType: 'button',
        disable: true,
      },
    ],
    leftDropDown: {
      label: 'All accounts',
      show: true,
      viewType: 'button',
      itemLabelAsMenuLabel: true,
      isRectangularBtn: true,
      menuPosition: 'right-to-left',
      icon: 'arrow_drop_down',
      defaultIcon: true,
      toolTipMessage: 'Default View',
      groups: [
        {
          title: 'Public',
          actions: [
            {
              type: '1050;KANBAN',
              label: 'Accounts View',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'Accounts View',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1189;KANBAN',
              label: 'for akhils',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'for akhils',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1202;KANBAN',
              label: 'testing',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'testing',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1219;KANBAN',
              label: 'testt2',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'testt2',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1223;KANBAN',
              label: 'check 2',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'check 2',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1209;KANBAN',
              label: 'kanban view1',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'kanban view1',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1213;LIST',
              label: 'Task',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'Task',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'table_view',
            },
            {
              type: '1216;LIST',
              label: 'Tech Info',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'Tech Info',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'table_view',
            },
            {
              type: '1214;LIST',
              label: 'Task 2',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'Task 2',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'table_view',
            },
            {
              type: '1005;LIST',
              label: 'All accounts',
              active: true,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                  info: 'This list view is set as the default view and cannot be deleted.',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'table_view',
              color: '#068de6',
            },
            {
              type: '1221;KANBAN',
              label: 'check',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'check',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1218;KANBAN',
              label: 'test',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'test',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
            {
              type: '1459;KANBAN',
              label: 'Dashboard',
              active: false,
              subMenu: [
                { type: 'edit', label: 'Edit', icon: 'edit' },
                { type: 'favourite', label: 'Favourite', icon: 'star' },
                {
                  type: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  color: 'red',
                  isBorderTop: true,
                  disable: true,
                },
                {
                  type: 'set_default_view',
                  label: 'Set as My Default View',
                  icon: 'push_pin',
                  name: 'Dashboard',
                },
              ],
              sharingRule: 'PUBLIC',
              icon: 'view_week',
            },
          ],
        },
      ],
      createNewAction: { isShow: true, label: 'New View' },
    },
    tabConfig: {
      type: 'tabs',
      tabs: [
        {
          tabName: 'All Accounts',
          tabID: 'all_accounts',
          event: 'ALL_ACCOUNTS',
        }
      ]
    }
  };
  dataSource: any[] = [
    {
      data: {
        owner: 'akhil masanam',
        pkId: 277,
        website: 'https://www.zentrixbio.com',
        exchangeRate: 0.005,
        yearlyRevenue: 5,
        changedBy: 'akhil masanam',
        name: 'akhil',
        changedAt: '2025-08-21T11:39:04.932874',
        currency: 'Indonesian Rupiah',
      },
      link: {
        name: { displayLabel: 'akhil', path: 'details/277', type: 'internal' },
      },
      dropdown: {},
      lookup: {
        owner: {
          displayValue: 'akhil masanam',
          path: '../../settings/users/view',
          params: { userId: 57 },
          data: {
            name: 'akhil masanam',
            email: 'akhilmasanam.dev@gmail.com',
            id: 2143,
            pkId: 57,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'akhil masanam',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'akhil masanam' },
              { label: 'Email', value: 'akhilmasanam.dev@gmail.com' },
            ],
          },
        },
        changedBy: {
          displayValue: 'akhil masanam',
          path: '../../settings/users/view',
          params: { userId: 57 },
          data: {
            name: 'akhil masanam',
            email: 'akhilmasanam.dev@gmail.com',
            id: 2143,
            pkId: 57,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'akhil masanam',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'akhil masanam' },
              { label: 'Email', value: 'akhilmasanam.dev@gmail.com' },
            ],
          },
        },
        cal_base_currency: {
          params: {},
          data: { yearlyRevenue: 5 },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [{ label: 'Name' }],
          },
        },
      },
      progressBar: { color: 'red' },
      menu: {
        show: true,
        label: 'Action',
        actions: [
          { label: 'Edit', type: 'EDIT', color: 'blue', icon: 'edit' },
          {
            label: 'Delete',
            type: 'DELETE',
            color: '#bd3232',
            icon: 'delete',
            confirmationPopover: {
              isShow: true,
              content: {
                message: 'Do you want to Delete for Account Name : akhil ?',
              },
              actions: {
                primary: { title: 'Yes' },
                secondary: { title: 'No' },
              },
            },
          },
        ],
      },
      currency: {
        yearlyRevenue: {
          appCurrencyConfig: {
            config: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            symbol: 'Rs.',
          },
        },
      },
    },
    {
      data: {
        owner: 'karthik penugonda',
        pkId: 274,
        website: 'https://www.nexussoft.in',
        exchangeRate: 0.043,
        changedBy: 'karthik penugonda',
        name: 'Test Account',
        changedAt: '2025-08-21T11:27:14.984846',
        currency: 'UAE Dirham',
      },
      link: {
        name: {
          displayLabel: 'Test Account',
          path: 'details/274',
          type: 'internal',
        },
      },
      dropdown: {},
      lookup: {
        owner: {
          displayValue: 'karthik penugonda',
          path: '../../settings/users/view',
          params: { userId: 11 },
          data: {
            name: 'karthik penugonda',
            email: 'karthik.penugonda@serole.com',
            id: 1097,
            pkId: 11,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'karthik penugonda',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'karthik penugonda' },
              { label: 'Email', value: 'karthik.penugonda@serole.com' },
            ],
          },
        },
        changedBy: {
          displayValue: 'karthik penugonda',
          path: '../../settings/users/view',
          params: { userId: 11 },
          data: {
            name: 'karthik penugonda',
            email: 'karthik.penugonda@serole.com',
            id: 1097,
            pkId: 11,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'karthik penugonda',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'karthik penugonda' },
              { label: 'Email', value: 'karthik.penugonda@serole.com' },
            ],
          },
        },
        cal_base_currency: {
          params: {},
          data: {},
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [{ label: 'Name' }],
          },
        },
      },
      progressBar: { color: 'red' },
      menu: {
        show: true,
        label: 'Action',
        actions: [
          { label: 'Edit', type: 'EDIT', color: 'blue', icon: 'edit' },
          {
            label: 'Delete',
            type: 'DELETE',
            color: '#bd3232',
            icon: 'delete',
            confirmationPopover: {
              isShow: true,
              content: {
                message:
                  'Do you want to Delete for Account Name : Test Account ?',
              },
              actions: {
                primary: { title: 'Yes' },
                secondary: { title: 'No' },
              },
            },
          },
        ],
      },
      currency: {
        yearlyRevenue: {
          appCurrencyConfig: {
            config: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            symbol: 'Rs.',
          },
        },
      },
    },
    {
      data: {
        pkId: 262,
        website: 'http://optus.com.au',
        exchangeRate: 0.0125,
        changedBy: 'Serole Admin',
        name: 'OPTUS NETWORKS PTY LIMITED',
        changedAt: '2025-08-14T12:36:10.312435',
        currency: 'US Dollar',
        status: 'Active',
      },
      link: {
        name: {
          displayLabel: 'OPTUS NETWORKS PTY LIMITED',
          path: 'details/262',
          type: 'internal',
        },
      },
      dropdown: { status: [{ keyTt: 'Active', valueTt: 'Active' }] },
      lookup: {
        changedBy: {
          displayValue: 'Serole Admin',
          path: '../../settings/users/view',
          params: { userId: 1 },
          data: {
            name: 'Serole Admin',
            email: 'serole.admin@gmail.com',
            id: 2001,
            pkId: 1,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'Serole Admin',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'Serole Admin' },
              { label: 'Email', value: 'serole.admin@gmail.com' },
            ],
          },
        },
        cal_base_currency: {
          params: {},
          data: {},
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [{ label: 'Name' }],
          },
        },
      },
      progressBar: { color: 'red' },
      menu: {
        show: true,
        label: 'Action',
        actions: [
          { label: 'Edit', type: 'EDIT', color: 'blue', icon: 'edit' },
          {
            label: 'Delete',
            type: 'DELETE',
            color: '#bd3232',
            icon: 'delete',
            confirmationPopover: {
              isShow: true,
              content: {
                message:
                  'Do you want to Delete for Account Name : OPTUS NETWORKS PTY LIMITED ?',
              },
              actions: {
                primary: { title: 'Yes' },
                secondary: { title: 'No' },
              },
            },
          },
        ],
      },
      currency: {
        yearlyRevenue: {
          appCurrencyConfig: {
            config: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            symbol: 'Rs.',
          },
        },
      },
    },
    {
      data: {
        owner: 'Manogar Loganathan',
        pkId: 184,
        website: 'http://radiant.com',
        yearlyRevenue: 2000000,
        changedBy: 'Serole Admin',
        name: 'Radiant Display Technology',
        changedAt: '2025-07-25T04:58:19.313953',
        status: 'Active',
      },
      link: {
        name: {
          displayLabel: 'Radiant Display Technology',
          path: 'details/184',
          type: 'internal',
        },
      },
      dropdown: { status: [{ keyTt: 'Active', valueTt: 'Active' }] },
      lookup: {
        owner: {
          displayValue: 'Manogar Loganathan',
          path: '../../settings/users/view',
          params: { userId: 37 },
          data: {
            name: 'Manogar Loganathan',
            email: 'manogar.dl@serole.com',
            id: 2074,
            pkId: 37,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'Manogar Loganathan',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'Manogar Loganathan' },
              { label: 'Email', value: 'manogar.dl@serole.com' },
            ],
          },
        },
        changedBy: {
          displayValue: 'Serole Admin',
          path: '../../settings/users/view',
          params: { userId: 1 },
          data: {
            name: 'Serole Admin',
            email: 'serole.admin@gmail.com',
            id: 2001,
            pkId: 1,
          },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              title: 'Serole Admin',
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [
              { label: 'Name', value: 'Serole Admin' },
              { label: 'Email', value: 'serole.admin@gmail.com' },
            ],
          },
        },
        cal_base_currency: {
          params: {},
          data: { yearlyRevenue: 2000000 },
          displayPopoverConfig: {
            isShow: true,
            variantType: 'basicVariant',
            header: {
              showDetailIcon: false,
              closeIcon: true,
              avatarSettings: { initialsSize: 2, size: 40 },
            },
            popover: { trigger: 'hover', placement: 'right' },
            content: [{ label: 'Name' }],
          },
        },
      },
      progressBar: { color: 'red' },
      menu: {
        show: true,
        label: 'Action',
        actions: [
          { label: 'Edit', type: 'EDIT', color: 'blue', icon: 'edit' },
          {
            label: 'Delete',
            type: 'DELETE',
            color: '#bd3232',
            icon: 'delete',
            confirmationPopover: {
              isShow: true,
              content: {
                message:
                  'Do you want to Delete for Account Name : Radiant Display Technology ?',
              },
              actions: {
                primary: { title: 'Yes' },
                secondary: { title: 'No' },
              },
            },
          },
        ],
      },
      currency: {
        yearlyRevenue: {
          appCurrencyConfig: {
            config: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            symbol: 'Rs.',
          },
        },
      },
    },
  ];
}
