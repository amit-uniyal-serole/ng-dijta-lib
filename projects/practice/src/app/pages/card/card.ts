import { Component } from '@angular/core';
import { DxCardConfig, DxDetailsCard } from 'projects/ng-dijta/src/lib/components/dx-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
})
export class Card {
  config: DxCardConfig = {
    cardConfig: {
      type: 'basic'
    },
    basicCardConfig: {
      profile: {
        show: true,
        name: 'Aprajita Lakhera',
        // icon: 'home',
      },
      description: {
        title: { name: 'Senior Software Engineer', badge: 'Pro', badgeColor: '#ccc' },
        subtitle: { label: 'Company', value: 'Serole Technologies Pvt Ltd' },
        maxTitleWidth: true,
      },
      contentListing: [
        {
          icon: 'home',
          label: 'Home',
          value: 'Rpmsoft Technologies Pvt Ltd'
        },
        {
          icon: 'email',
          label: 'Email',
          value: 'aprajita.lakhera@example.com'
        },
        {
          icon: 'phone',
          label: 'Phone',
          value: '+91 98765 43210'
        },
        {
          icon: 'location_on',
          label: 'Location',
          value: 'Hyderabad, India'
        },
        {
          icon: 'work',
          label: 'Experience',
          value: '6+ years in Software Development'
        },
        {
          icon: 'school',
          label: 'Education',
          value: 'B.Tech in Computer Science'
        },
        {
          icon: 'language',
          label: 'Website',
          value: 'https://aprajita.dev'
        },
        {
          icon: 'groups',
          label: 'Team',
          value: 'Platform Engineering'
        }
      ],
      actions: {
        show: true,
        type: 'string',
        title: 'string',
        // disabled?: boolean;
        // src?: string;
        // class?: ButtonClasses;
        // icon?: string;
        // confirmationPopover?: ConfirmationPopover;
        // multiActionDropDown?: MultiActionDropDown;
        // classCondition?: ConditionClass;
        // permission?: DxPermission
      }
    },
  }
  
  cardDetails: DxDetailsCard = {
    col: 'col-md-12',
    cards: [
      {
        labelAlignment: 'right',
        title: 'Key Details',
        col: 'col-md-6',
        content: [
          {
            label: 'Created At',
            value: '2025-08-14T12:36:10.312435',
            fieldName: 'createdAt',
            type: 'datetime',
            params: { newTab: false },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Changed At',
            value: '2025-08-14T12:36:10.312435',
            fieldName: 'changedAt',
            type: 'datetime',
            params: { newTab: false },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                //     //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Created By',
            value: 'Serole Admin',
            fieldName: 'createdBy',
            type: 'text',
            displayPopoverConfig: {
              popover: { placement: 'top', trigger: 'hover' },
              isShow: true,
              variantType: 'basicVariant',
              header: {
                closeIcon: false,
                title: 'Serole Admin',
                avatarSettings: { initialsSize: 2, size: 40 },
              },
              content: [
                { label: 'Name', value: 'Serole Admin' },
                { label: 'Email', value: 'serole.admin@gmail.com' },
                { label: 'Pkid', value: '1' },
              ],
              data: {
                name: 'Serole Admin',
                email: 'serole.admin@gmail.com',
                id: 2001,
                pkId: 1,
              },
            },
            path: '../../../../settings/users/view',
            params: { newTab: false, userId: 1 },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                //     //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Changed By',
            value: 'Serole Admin',
            fieldName: 'changedBy',
            type: 'text',
            displayPopoverConfig: {
              popover: { placement: 'top', trigger: 'hover' },
              isShow: true,
              variantType: 'basicVariant',
              header: {
                closeIcon: false,
                title: 'Serole Admin',
                avatarSettings: { initialsSize: 2, size: 40 },
              },
              content: [
                { label: 'Name', value: 'Serole Admin' },
                { label: 'Email', value: 'serole.admin@gmail.com' },
                { label: 'Pkid', value: '1' },
              ],
              data: {
                name: 'Serole Admin',
                email: 'serole.admin@gmail.com',
                id: 2001,
                pkId: 1,
              },
            },
            path: '../../../../settings/users/view',
            params: { newTab: false, userId: 1 },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                //     //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Website',
            value: 'http://optus.com.au',
            fieldName: 'website',
            type: 'URL',
            params: { newTab: true },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Account Name',
            value: 'OPTUS NETWORKS PTY LIMITED',
            fieldName: 'name',
            type: 'text',
            params: { newTab: false },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Account Number',
            fieldName: 'accountNo',
            type: 'text',
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Account Type',
            settings: { dropdown: [] },
            fieldName: 'type',
            type: 'text',
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Account Classification',
            settings: { dropdown: [] },
            fieldName: 'classification',
            type: 'text',
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Industry',
            settings: { dropdown: [] },
            fieldName: 'industry',
            type: 'text',
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Account Owner',
            fieldName: 'owner',
            type: 'text',
            displayPopoverConfig: {
              popover: { placement: 'top', trigger: 'hover' },
              isShow: true,
              variantType: 'basicVariant',
              header: {
                title: '',
                closeIcon: false,
                showDetailIcon: true,
                avatarSettings: { initialsSize: 2, size: 40 },
              },
              content: [],
            },
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Status',
            value: 'Active',
            settings: { dropdown: [{ keyTt: 'Active', valueTt: 'Active' }] },
            fieldName: 'status',
            type: 'dropdown',
            params: { newTab: false },
            adapterData: {
              uploadUrl: '',
              thumbnailUrl: 'undefined0x0/undefined',
              removeFileUrl: '/dx-lcnc-crm-api/v1/settings/images/record',
              downloadUrl: '/dx-lcnc-crm-apiundefined',
            },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
          {
            label: 'Parent Account ',
            fieldName: 'accountId',
            type: 'text',
            displayPopoverConfig: {
              popover: { placement: 'top', trigger: 'hover' },
              isShow: true,
              variantType: 'basicVariant',
              header: {
                title: '',
                closeIcon: false,
                avatarSettings: { initialsSize: 2, size: 40 },
              },
              content: [],
            },
            params: { newTab: false },
            currencySettings: {
              appCurrencyConfig: {
                config: {
                  decimalSeparator: 'Period',
                  numeralSystem: 'indian',
                  thousand_separator: 'Comma',
                    //   compactNumberNotations: true,
                },
                decimal: 5,
                symbol: '$',
              },
            },
          },
        ],
      }
    ],
  };
}
