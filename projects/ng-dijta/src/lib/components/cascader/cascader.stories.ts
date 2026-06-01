import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CascaderComponent } from './cascader.component';
import { CascaderModule } from './cascader.module';

const meta: Meta<any> = {
  title: 'Utilities/Cascader',
  component: CascaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CascaderModule, ReactiveFormsModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    options: { control: 'object', description: 'Type: `CascaderItem[]`.' },
    width: { control: 'object' },
    dropdownWidth: { control: 'number', description: 'Type: `number`.' },
    placeholder: { control: 'object' },
    trigger: { control: { type: 'inline-radio' }, options: ["click","hover"], description: 'Type: `\'click\' | \'hover\'`.' },
    disabled: { control: 'object' },
    multiple: { control: 'object' },
    showPath: { control: 'object' },
    allowClear: { control: 'object' },
    allowSearch: { control: 'object' },
    canSelectParent: { control: 'object' },
    checkboxRelation: { control: 'object' },
    dropdownPanelClass: { control: 'object' },
    appendToBody: { control: 'object' },
    tagMaxWidth: { control: 'object' },
    loaderIndex: { control: 'object' },
    loadChildrenFn: { control: 'object', description: 'Type: `(value: CascaderItem`.' },
    toggleEvent: { action: 'toggleEvent' },
  },
  args: {
    options: [],
    width: 0,
    dropdownWidth: 0,
    placeholder: '',
    trigger: 'hover',
    disabled: false,
    multiple: false,
    showPath: false,
    allowClear: false,
    allowSearch: false,
    canSelectParent: false,
    dropdownPanelClass: '',
    appendToBody: true,
    tagMaxWidth: '200px',
    loaderIndex: 3,
    loadChildrenFn: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `<d-cascader [formControl]="control" [options]="options" [width]="width" [dropdownWidth]="dropdownWidth" [placeholder]="placeholder" [trigger]="trigger" [disabled]="disabled" [multiple]="multiple" [showPath]="showPath" [allowClear]="allowClear" [allowSearch]="allowSearch" [canSelectParent]="canSelectParent" [checkboxRelation]="checkboxRelation" [dropDownItemTemplate]="dropDownItemTemplate" [dropdownHeaderTemplate]="dropdownHeaderTemplate" [hostTemplate]="hostTemplate" [dropdownPanelClass]="dropdownPanelClass" [appendToBody]="appendToBody" [tagMaxWidth]="tagMaxWidth" [loaderIndex]="loaderIndex" [loadChildrenFn]="loadChildrenFn"></d-cascader>`,
  }),
};
