import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputDatePickerComponent } from './dx-input-datepicker.component';
import { DxInputDatePickerModule } from './dx-input-datepicker.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input Datepicker',
  component: DxInputDatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputDatePickerModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    maxDate: { control: 'object', description: 'Type: `Date`.' },
    minDate: { control: 'object', description: 'Type: `Date`.' },
    disabled: { control: 'boolean', description: 'Type: `boolean`.' },
    noneBorder: { control: 'boolean', description: 'Type: `boolean`.' },
    required: { control: 'boolean', description: 'Type: `boolean`.' },
    noneLabel: { control: 'boolean', description: 'Type: `boolean`.' },
    outline: { control: { type: 'inline-radio' }, options: ["floating","none-floating","outer-label"], description: 'Type: `\'floating\' | \'none-floating\' | \'outer-label\'`.' },
    placeholder: { control: 'text', description: 'Type: `string`.' },
    onDateChange: { action: 'onDateChange' },
  },
  args: {
    maxDate: {},
    minDate: {},
    disabled: false,
    noneBorder: false,
    required: false,
    noneLabel: false,
    outline: 'none-floating',
    placeholder: 'Select Date',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `<dx-input-datepicker [formControl]="control" [maxDate]="maxDate" [minDate]="minDate" [disabled]="disabled" [noneBorder]="noneBorder" [required]="required" [noneLabel]="noneLabel" [outline]="outline" [placeholder]="placeholder">
      <p dxLabel>Field label</p>
    </dx-input-datepicker>`,
  }),
};


export const WithSlots: Story = {
  args: {
    outerLabelText: 'Field label',
    suffixIcon: 'help',
    hintText: 'Helper text for the field.',
    errorText: '',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '<p dxLabel> outer-label text. Visible when outline = "outer-label". Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '<dx-suffix> Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '<dx-hint> helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '<dx-error> error text. Set a value to show.', table: { category: 'Slots' } },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
    <dx-input-datepicker [formControl]="control" [maxDate]="maxDate" [minDate]="minDate" [disabled]="disabled" [noneBorder]="noneBorder" [required]="required" [noneLabel]="noneLabel" [outline]="outline" [placeholder]="placeholder">
      <p dxLabel>{{ outerLabelText }}</p>
      <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
      <dx-hint>{{ hintText }}</dx-hint>
      <dx-error>{{ errorText }}</dx-error>
    </dx-input-datepicker>`,
  }),
};
