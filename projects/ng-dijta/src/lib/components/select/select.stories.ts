import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';

const meta: Meta<any> = {
  title: 'Utilities/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectModule, ReactiveFormsModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    options: { control: 'object' },
    isSearch: { control: 'object' },
    toggleOnFocus: { control: 'object' },
    scrollHight: { control: 'object' },
    highlightItemClass: { control: 'object' },
    filterKey: { control: 'text', description: 'Type: `string`.' },
    valueKey: { control: 'text', description: 'Type: `string`.' },
    multiple: { control: 'boolean', description: 'Type: `boolean`.' },
    isSelectAll: { control: 'object' },
    size: { control: { type: 'inline-radio' }, options: ["","sm","lg"], description: 'Type: `\'\' | \'sm\' | \'lg\'`.' },
    appendToBody: { control: 'object' },
    appendToBodyDirections: { control: 'object', description: 'Type: `Array<AppendToBodyDirection | ConnectedPosition>`.' },
    appendToBodyScrollStrategy: { control: 'object', description: 'Type: `AppendToBodyScrollStrategyType`.' },
    width: { control: 'number', description: 'Type: `number`.' },
    templateItemSize: { control: 'number', description: 'Type: `number`.' },
    disabled: { control: 'object' },
    placeholder: { control: 'object' },
    searchPlaceholder: { control: 'object' },
    searchFn: { control: 'object', description: 'Type: `(term: string)`.' },
    valueParser: { control: 'object', description: 'Type: `(item: any)`.' },
    formatter: { control: 'object', description: 'Type: `(item: any)`.' },
    direction: { control: { type: 'inline-radio' }, options: ["up","down","auto"], description: 'Type: `\'up\' | \'down\' | \'auto\'`.' },
    overview: { control: { type: 'inline-radio' }, options: ["border","underlined"], description: 'Type: `\'border\' | \'underlined\'`.' },
    allowClear: { control: 'object' },
    color: { control: 'object' },
    enableLazyLoad: { control: 'object' },
    virtualScroll: { control: 'object' },
    extraConfig: { control: 'object', description: 'Type: `{ labelization?: { enable: boolean`.' },
    optionDisabledKey: { control: 'object' },
    optionImmutableKey: { control: 'object' },
    keepMultipleOrder: { control: { type: 'inline-radio' }, options: ["origin","user-select"], description: 'Type: `\'origin\' | \'user-select\'`.' },
    customViewDirection: { control: { type: 'inline-radio' }, options: ["bottom","right","left","top"], description: 'Type: `\'bottom\' | \'right\' | \'left\' | \'top\'`.' },
    autoScrollIntoActive: { control: 'object' },
    autoFocus: { control: 'object' },
    notAutoScroll: { control: 'object' },
    showItemTitle: { control: 'object' },
    beforeChange: { control: 'object', description: 'Type: `(index, option, action)`.' },
    toggleChange: { action: 'toggleChange' },
    loadMore: { action: 'loadMore' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    isSearch: false,
    toggleOnFocus: false,
    scrollHight: '300px',
    highlightItemClass: 'active',
    filterKey: 'Sample',
    valueKey: 'Sample',
    multiple: false,
    isSelectAll: false,
    size: '',
    appendToBody: false,
    appendToBodyDirections: [],
    appendToBodyScrollStrategy: {},
    width: 0,
    templateItemSize: 0,
    disabled: false,
    placeholder: '',
    searchPlaceholder: '',
    searchFn: {},
    valueParser: {},
    formatter: {},
    direction: 'down',
    overview: 'border',
    allowClear: false,
    enableLazyLoad: false,
    extraConfig: {},
    optionDisabledKey: '',
    optionImmutableKey: '',
    keepMultipleOrder: 'user-select',
    customViewDirection: 'bottom',
    autoScrollIntoActive: false,
    autoFocus: false,
    notAutoScroll: false,
    showItemTitle: false,
    beforeChange: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `<d-select [formControl]="control" [options]="options" [isSearch]="isSearch" [toggleOnFocus]="toggleOnFocus" [scrollHight]="scrollHight" [highlightItemClass]="highlightItemClass" [filterKey]="filterKey" [valueKey]="valueKey" [multiple]="multiple" [isSelectAll]="isSelectAll" [size]="size" [appendToBody]="appendToBody" [appendToBodyDirections]="appendToBodyDirections" [appendToBodyScrollStrategy]="appendToBodyScrollStrategy" [width]="width" [templateItemSize]="templateItemSize" [disabled]="disabled" [placeholder]="placeholder" [searchPlaceholder]="searchPlaceholder" [searchFn]="searchFn" [valueParser]="valueParser" [formatter]="formatter" [direction]="direction" [overview]="overview" [allowClear]="allowClear" [color]="color" [enableLazyLoad]="enableLazyLoad" [virtualScroll]="virtualScroll" [inputItemTemplate]="inputItemTemplate" [extraConfig]="extraConfig" [optionDisabledKey]="optionDisabledKey" [optionImmutableKey]="optionImmutableKey" [noResultItemTemplate]="noResultItemTemplate" [keepMultipleOrder]="keepMultipleOrder" [customViewTemplate]="customViewTemplate" [customViewDirection]="customViewDirection" [autoScrollIntoActive]="autoScrollIntoActive" [autoFocus]="autoFocus" [notAutoScroll]="notAutoScroll" [loadingTemplateRef]="loadingTemplateRef" [showItemTitle]="showItemTitle" [beforeChange]="beforeChange"></d-select>`,
  }),
};
