import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DxDetailsCard,
  DxDrawerService,
  DxLookupModalConfig,
  DxTableColumn,
  DxTableData,
  DxTableSetting,
  GroupAction,
  KanbanViewColumnContent,
  KanbanViewColumnsModel,
  KanbanViewModel,
  KeyValueModel,
} from 'projects/ng-dijta/src/public-api';
import { ModelBoxComponent } from './model-box.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CanvasComponent } from './cavas.component';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- <dx-table  [columns]="columns" [setting]="setting" [dataSource]="dataSource"></dx-table>
    
      <ng-template #canvasTemplate let-data let-columns="columns">
     
      <div class="card">
        Full record: {{ data | json }}
      </div>

      </ng-template> -->
          <div class="dx-card mt-3">
            <!-- <dx-card-wrapper [config]="config"></dx-card-wrapper> -->
            <dx-kanban-view [dataSource]="kanban"></dx-kanban-view>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserComponent implements OnInit {
  lookupModalConfig: DxLookupModalConfig = {
    idName: {
      id: 'userId',
      name: 'firstName',
    },
    lookupApiConfig: {
      method: 'GET',
      api: `/dx-lcnc-crm-api/v1/settings/users/13/determine-superiors`,
      searchBasedOn: 'firstName',
      searchBasedOperator: 'lk',
      paginationRequest: {
        pageNo: 0,
        pageSize: 10,
      },
    },
    isGenericService: true,
  };

  toggle: boolean = true;
  amount: number = 23.1235;
  dataSource: DxTableData<any>[] = [];
  user: string | undefined;
  selects: KeyValueModel[] = [
    {
      keyTt: '1',
      valueTt: 'Escalation',
    },
    {
      keyTt: '2',
      valueTt: 'Scheduler',
    },
    {
      keyTt: '3',
      valueTt: 'OnCall',
    },
    {
      keyTt: '4',
      valueTt: 'ReCall',
    },
  ];
  config = {
    cardConfig: { type: 'basic' },
    basicCardConfig: {
      profile: {
        name: 'Acme Corp',
        settings: {
          size: 70,
          initialsSize: 2,
          isImageUpload: true,
          cornerRadius: '5px',
          round: true,
        },
        show: true,
      },
      description: { title: { name: 'Acme Corp' } },
      tiles: [],
      actionGroup: {
        actions: [
          {
            label: 'Edit',
            event: 'EDIT',
            icon: 'edit',
          },
          {
            label: 'Send Email',
            event: 'SEND_EMAIL',
            icon: 'email',
            btnType: 'secondary-btn',
            permission: {
              apiName: 'settings.system.oncall.manage.roster',
              permission: 'create',
            },
          },
        ],
        subActions: [
          {
            label: 'Clone',
            event: 'DELETE',
          },
          {
            label: 'Delete',
            event: 'DELETE',
            permission: {
              apiName: 'settings.system.oncall.manage.roster',
              permission: 'delete',
            },
          },
          {
            label: 'Print Preview',
            event: 'DELETE',
            permission: {
              apiName: 'settings.system.oncall.manage.roster',
              permission: 'edit',
            },
          },
          {
            label: 'Find and Merge Duplicate',
            event: 'DELETE',
            permission: {
              apiName: 'settings.system.oncall.manage.roster',
              permission: 'view',
            },
          },
        ],
      } as GroupAction,
    },
  };
  constructor(
    private dialog: MatDialog,
    private drawarService: DxDrawerService
  ) {}
  ngOnInit(): void {
    this.dataSource = [
      {
        data: {
          pkId: 17,
          createdAt: '2025-07-15T17:20:53.607907',
          createdBy: 2001,
          changedAt: '2025-07-15T17:20:53.607907',
          changedBy: 2001,
          currencyCustomId: 1016,
          currencyId: 1009,
          currencyName: 'Indian Rupee - INR',
          currencyCode: 'INR',
          currencySymbol: 1000000,
          thousandSeparator: 'Comma',
          mobile: '61444444444',
          decimalPlaces: 2,
          decimalSeparator: 'Period',
          status: 'Active',
          numeralSystem: 'indian',
          baseCurrency: true,
        },
        toggle: {
          checked: false,
          disable: true,
        },
        currency: {
          currencySymbol: {
            appCurrencyConfig: {
              config: {
                decimalSeparator: 'Period',
                thousand_separator: 'Comma',
                numeralSystem: 'indian',
                locale: 'en-IN',
                compactNumberNotations: true,
              },
              decimal: 2,
              symbol: '₹',
            },
          },
        },
        menu: {
          label: 'Action',
          show: true,
          actions: [
            {
              type: 'EDIT',
              label: 'Edit',
              icon: 'edit',
            },
          ],
        },
      },
      {
        data: {
          pkId: 18,
          createdAt: '2025-07-15T17:25:01.578632',
          createdBy: 2001,
          changedAt: '2025-07-15T18:32:46.120951',
          changedBy: 2001,
          currencyCustomId: 1017,
          currencyId: 1001,
          currencyName: 'Euro - EUR',
          currencyCode: 'EUR',
          currencySymbol: '1234',
          thousandSeparator: 'Comma',
          decimalPlaces: 2,
          decimalSeparator: 'Period',
          status: 'Active',
          numeralSystem: 'international',
          baseCurrency: false,
        },
        toggle: {
          checked: true,
          disable: false,
        },
        currency: {
          currencySymbol: {
            appCurrencyConfig: {
              config: {
                decimalSeparator: 'Period',
                thousand_separator: 'Comma',
                numeralSystem: 'international',
              },
              decimal: 0,
              symbol: '€',
            },
          },
        },
        menu: {
          label: 'Action',
          show: true,
          actions: [
            {
              type: 'EDIT',
              label: 'Edit',
              icon: 'edit',
            },
          ],
        },
      },
    ];
  }

  fg = new FormGroup({
    currency: new FormControl(2000),
    autocomplete: new FormControl(''),
    input: new FormControl('12', Validators.required),
    name: new FormControl('Demo'),
    email: new FormControl(''),
    chips: new FormControl([]),
    daterange: new FormControl(''),
    select: new FormControl(''),
    date: new FormControl(''),
    date1: new FormControl(''),
    phoneNumber: new FormControl(''),
    datetime: new FormControl(''),
    checkbox: new FormControl(''),
    radio: new FormControl(''),
    dob: new FormControl(''),
    icon: new FormControl(''),
    textarea: new FormControl(''),
    images: new FormControl(),
    select1: new FormControl(),
    criteriaFilter: new FormControl(),
    tag: new FormControl([]),
    image: new FormControl([]),
    number: new FormControl(230000),
    toggle: new FormControl(),
  });

  setting: any = {
    pageSize: 50,
    pageIndex: 0,
    pagination: true,
    paginationFirstLastButtons: true,
    totalItems: 10,
    enableRowClick: true,
    multiActionButtonSettings: {
      type: 'addSite',
      title: 'Add Site',
      show: true,
      multiActionDropDown: {
        show: true,
        menuList: [
          {
            label: 'Edit',
            event: 'EDIT',
          },
        ],
      },
    },
  };
  columns: DxTableColumn<any>[] = [
    {
      type: 'custom',
      field: 'currencyName',
      title: 'Currency Name',
      columnDef: 'currencyName',
      component: CanvasComponent,
    },
    {
      type: 'custom',
      field: 'currencySymbol',
      title: 'Format',
      columnDef: 'currencySymbol',
      component: CanvasComponent,
    },
    {
      type: 'text',
      field: 'exchange_rate',
      title: 'Exchange Rate',
      columnDef: 'exchange_rate',
    },
    {
      type: 'contact',
      field: 'mobile',
      title: 'mobile',
      columnDef: 'mobile',
    },
    {
      type: 'contact',
      field: 'mobile3',
      title: 'mobile3',
      columnDef: 'mobile3',
    },
    {
      type: 'contact',
      field: 'mobile4',
      title: 'mobile4',
      columnDef: 'mobile4',
    },
    {
      type: 'contact',
      field: 'mobile5',
      title: 'mobile5',
      columnDef: 'mobile5',
    },
    {
      type: 'contact',
      field: 'mobile6',
      title: 'mobile6',
      columnDef: 'mobile6',
    },
    {
      type: 'contact',
      field: 'mobile7',
      title: 'mobile7',
      columnDef: 'mobile7',
    },
    {
      type: 'contact',
      field: 'mobile8',
      title: 'mobile8',
      columnDef: 'mobile8',
    },
    {
      type: 'contact',
      field: 'mobile9',
      title: 'mobile9',
      columnDef: 'mobile9',
    },
    {
      field: 'action',
      columnDef: 'action',
      title: '',
      type: 'hove-menu',
    },
  ];

  cardDetails: DxDetailsCard = {
    col: 'col-md-12',
    cards: [
      {
        labelAlignment: 'right',
        title: 'Acccess Details',
        col: 'col-md-12',
        content: [
          {
            label: 'Access Details',
            value: 200000000000000003.333,
            fieldName: 'accessDetails',
            type: 'currency',
            params: {},
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  thousand_separator: 'Comma',
                  numeralSystem: 'international',
                  compactNumberNotations: true,
                },
                decimal: 0,
                symbol: '€',
              },
            },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: 'dx-lcnc-sdr-api/v1/settings/images/record',
              downloadUrl: 'dx-lcnc-sdr-apiundefined',
            },
            link: {
              displayLabel: '<p>ABCD123</p>',
              path: 'FORMATTER',
              type: 'external',
              openInNewTab: false,
            },
          },
        ],
      },
    ],
  };

  kanban: KanbanViewModel = {
    name: 'asdad',
    columns: [
      {
        name: 'OPEN',
        id: 'col-159',
        variant: 'standard',
        sequence: 1,
        content: [],
        apiConfig: {
          method: 'POST',
          api: '/dx-lcnc-crm-api/v1/module/record',
          body: {
            module: 'Deal',
            action: 'View',
            customViewId: 1646,
            paginationRequest: {
              sortOrder: 'desc',
              sortBy: 'pkId',
              pageNo: 0,
              pageSize: 10,
              search: 'status:eq:OPEN',
            },
          },
          transformRecord: (record) => {
            
            return (record?.response?.content ?? []).map((data) => {
              return  {
                id:1,
                sequence: 1,
                data: [
                  {
                    label: 'name',
                    value: data?.name
                  }
                ],
                original: data,
                header: {
                  title: 'demo',
                  // actions: [
                  //   {
                  //     label: 'de',
                  //     type: 'text',
                  //     icon: 'home'
                  //   }
                  // ],
                  actionGroup: {
                    subActions: [
                      {
                        label: 'Clone',
                        event: 'DELETE',
                        color: 'red',
                        // icon: 'edit'
                      },
                      {
                        label: 'Delete',
                        event: 'DELETE',
                        icon: 'edit',
                        permission: {
                          apiName: 'settings.system.oncall.manage.roster',
                          permission: 'delete',
                        },
                      },
                      {
                        label: 'Print Preview',
                        event: 'DELETE',
                        permission: {
                          apiName: 'settings.system.oncall.manage.roster',
                          permission: 'edit',
                        },
                      },
                      {
                        label: 'Find and Merge Duplicate',
                        event: 'DELETE',
                        permission: {
                          apiName: 'settings.system.oncall.manage.roster',
                          permission: 'view',
                        },
                      },
                    ]
                  }
                }
              }
            }) as KanbanViewColumnContent[]
          },
        },
        totalAmountUrl: {
          currencyFormat: {
            appCurrencyConfig: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            currencyCode: 'Rs.',
          },
          config: {
            method: 'POST',
            api: '/dx-lcnc-crm-api/v1/module/record/aggregate',
            body: {
              module: 'Deal',
              action: 'View',
              customViewId: 1646,
              paginationRequest: {
                sortOrder: 'desc',
                sortBy: 'pkId',
                pageNo: 0,
                pageSize: 10,
                search: 'status:eq:OPEN',
              },
            },
          },
        }
      },
      {
        name: 'CLOSE',
        id: 'col-162',
        variant: 'standard',
        sequence: 2,
        content: [],
        apiConfig: {
          method: 'POST',
          api: '/dx-lcnc-crm-api/v1/module/record',
          body: {
            module: 'Deal',
            action: 'View',
            customViewId: 1646,
            paginationRequest: {
              sortOrder: 'desc',
              sortBy: 'pkId',
              pageNo: 0,
              pageSize: 10,
              search: 'status:eq:CLOSE',
            },
          },
        },
        totalAmountUrl: {
          currencyFormat: {
            appCurrencyConfig: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            currencyCode: 'Rs.',
          },
          config: {
            method: 'POST',
            api: '/dx-lcnc-crm-api/v1/module/record/aggregate',
            body: {
              module: 'Deal',
              action: 'View',
              customViewId: 1646,
              paginationRequest: {
                sortOrder: 'desc',
                sortBy: 'pkId',
                pageNo: 0,
                pageSize: 10,
                search: 'status:eq:CLOSE',
              },
            },
          },
        },
      },
      {
        name: 'LOST',
        id: 'col-160',
        variant: 'standard',
        sequence: 3,
        content: [],
        apiConfig: {
          method: 'POST',
          api: '/dx-lcnc-crm-api/v1/module/record',
          body: {
            module: 'Deal',
            action: 'View',
            customViewId: 1646,
            paginationRequest: {
              sortOrder: 'desc',
              sortBy: 'pkId',
              pageNo: 0,
              pageSize: 10,
              search: 'status:eq:LOST',
            },
          },
        },
        totalAmountUrl: {
          currencyFormat: {
            appCurrencyConfig: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            currencyCode: 'Rs.',
          },
          config: {
            method: 'POST',
            api: '/dx-lcnc-crm-api/v1/module/record/aggregate',
            body: {
              module: 'Deal',
              action: 'View',
              customViewId: 1646,
              paginationRequest: {
                sortOrder: 'desc',
                sortBy: 'pkId',
                pageNo: 0,
                pageSize: 10,
                search: 'status:eq:LOST',
              },
            },
          },
        },
      },
      {
        name: 'WON',
        id: 'col-161',
        variant: 'standard',
        sequence: 4,
        content: [],
        apiConfig: {
          method: 'POST',
          api: '/dx-lcnc-crm-api/v1/module/record',
          body: {
            module: 'Deal',
            action: 'View',
            customViewId: 1646,
            paginationRequest: {
              sortOrder: 'desc',
              sortBy: 'pkId',
              pageNo: 0,
              pageSize: 10,
              search: 'status:eq:WON',
            },
          },
        },
        totalAmountUrl: {
          currencyFormat: {
            appCurrencyConfig: {
              decimalSeparator: 'Period',
              numeralSystem: 'indian',
              thousand_separator: 'Comma',
              compactNumberNotations: true,
            },
            decimal: 2,
            currencyCode: 'Rs.',
          },
          config: {
            method: 'POST',
            api: '/dx-lcnc-crm-api/v1/module/record/aggregate',
            body: {
              module: 'Deal',
              action: 'View',
              customViewId: 1646,
              paginationRequest: {
                sortOrder: 'desc',
                sortBy: 'pkId',
                pageNo: 0,
                pageSize: 10,
                search: 'status:eq:WON',
              },
            },
          },
        },
      },
    ],
  };

  onClick(event): void {
    this.dialog.open(ModelBoxComponent, {
      width: '50%',
    });
  }

  onDrawar(): void {
    this.drawarService.create({
      dxContent: ModelBoxComponent,
    });
  }
}
