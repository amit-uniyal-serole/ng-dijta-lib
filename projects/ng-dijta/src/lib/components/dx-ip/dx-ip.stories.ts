import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxIpComponent } from './dx-ip.component';
import { DxIpModule } from './dx-ip.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Ip',
  component: DxIpComponent,
  decorators: [
    moduleMetadata({
      imports: [DxIpModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Block-based IP / MAC address input. Each octet/group is its own focus stop — typing the ' +
          'separator (or filling an octet) auto-advances to the next block. Supports `ipv4`, ' +
          '`ipv4WithMask`, `ipv6`, and `mac` modes, per-block disabling, paste-with-split, and ' +
          'Ctrl-C copy of either a single block or the full address. Implements ' +
          '`ControlValueAccessor` + `Validator`.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'inline-radio' },
      options: ['ipv4', 'ipv4WithMask', 'ipv6', 'mac'],
      description: 'Address format. `ipv4` (4 octets), `ipv4WithMask` (4 octets + `/mask`), `ipv6` (8 groups), or `mac` (6 hex pairs).',
    },
    separator: { control: 'text', description: 'Octet/group delimiter. Defaults to the mode-specific separator (`.` for ipv4, `:` for ipv6/mac). Typing this character jumps to the next block.' },
    inputValidation: {
      control: { type: 'inline-radio' },
      options: ['none', 'char', 'block'],
      description: '`none` = no validation, `char` = only valid chars, `block` = only valid block values (default).',
    },
    highlightInvalidBlocks: { control: 'boolean', description: 'Add `ngx-ip-error` class to invalid blocks.' },
    disabledBlocks: { control: 'object', description: 'Bitmap of disabled blocks, e.g. `[true, true, false, false]` locks the first two octets.' },
    copyMode: {
      control: { type: 'inline-radio' },
      options: ['block', 'address', 'select'],
      description: '`block` = copy the focused block only, `address` = copy the full address, `select` = prompt the user on Ctrl-C.',
    },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'top'],
      description: 'Outer-label placement (only effective with `outline="outer-label"`).',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    theme: { control: 'text', description: 'Extra CSS class applied to the container for theming.' },
    disabled: { control: 'boolean', description: 'Disable the whole control.' },
    readonly: { control: 'boolean', description: 'Render all blocks read-only.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    tabIndex: { control: 'number', description: 'Tab order index applied to every block.' },
    change: { action: 'change', description: 'Fires with the assembled address string when any block changes.' },
  },
  args: {
    mode: 'ipv4',
    separator: '',
    inputValidation: 'block',
    highlightInvalidBlocks: true,
    disabledBlocks: [],
    copyMode: 'block',
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    theme: '',
    disabled: false,
    readonly: false,
    required: false,
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-ip
    [formControl]="control"
    [mode]="mode"
    [separator]="separator || null"
    [inputValidation]="inputValidation"
    [highlightInvalidBlocks]="highlightInvalidBlocks"
    [disabledBlocks]="disabledBlocks"
    [copyMode]="copyMode"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [theme]="theme"
    [disabled]="disabled"
    [readonly]="readonly"
    [required]="required"
    [tabIndex]="tabIndex">
    <p dxLabel>Address</p>
  </dx-ip>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty IPv4 address. Type a digit; press `.` or fill an octet to jump to the next block.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected address',
  parameters: {
    docs: {
      description: {
        story: 'Initial value bound via `FormControl("192.168.1.10")`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('192.168.1.10') },
    template: FULL_TEMPLATE,
  }),
};

export const IPv4WithMask: Story = {
  name: 'IPv4 with subnet mask',
  args: { mode: 'ipv4WithMask' },
  parameters: {
    docs: {
      description: {
        story: '`[mode]="ipv4WithMask"` appends a `/mask` block to the four octets.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('10.0.0.0/24') },
    template: FULL_TEMPLATE,
  }),
};

export const IPv6: Story = {
  name: 'IPv6',
  args: { mode: 'ipv6' },
  parameters: {
    docs: {
      description: {
        story: '`[mode]="ipv6"` renders eight hex groups separated by `:`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('2001:0db8:85a3:0000:0000:8a2e:0370:7334') },
    template: FULL_TEMPLATE,
  }),
};

export const Mac: Story = {
  name: 'MAC address',
  args: { mode: 'mac' },
  parameters: {
    docs: {
      description: {
        story: '`[mode]="mac"` renders six hex pairs separated by `:`. Useful for network device configuration.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('00:1A:2B:3C:4D:5E') },
    template: FULL_TEMPLATE,
  }),
};

export const CustomSeparator: Story = {
  name: 'Custom separator',
  args: { mode: 'ipv4', separator: ',' },
  parameters: {
    docs: {
      description: {
        story: '`[separator]` overrides the mode default. Pressing the separator key advances focus to the next block.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const PartialDisabled: Story = {
  name: 'Disabled blocks (first two octets)',
  args: { disabledBlocks: [true, true, false, false] },
  parameters: {
    docs: {
      description: {
        story: '`[disabledBlocks]` accepts a boolean array — `true` locks the corresponding block. Use to fix a network prefix while letting users edit the host portion.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('10.0.0.1') },
    template: FULL_TEMPLATE,
  }),
};

export const InvalidHighlight: Story = {
  name: 'Highlight invalid blocks',
  args: { highlightInvalidBlocks: true, inputValidation: 'char' },
  parameters: {
    docs: {
      description: {
        story: 'With `inputValidation="char"` the user can enter out-of-range values (e.g. `999`); `highlightInvalidBlocks` adds `ngx-ip-error` to bad blocks.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('999.0.0.1') },
    template: FULL_TEMPLATE,
  }),
};

export const NoValidation: Story = {
  name: 'No keystroke validation',
  args: { inputValidation: 'none' },
  parameters: {
    docs: {
      description: {
        story: '`[inputValidation]="none"` allows any keystroke. Useful when you need full free-form input but still want the block-based layout.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const CopyAddress: Story = {
  name: 'Copy full address',
  args: { copyMode: 'address' },
  parameters: {
    docs: {
      description: {
        story: '`[copyMode]="address"` makes Ctrl-C copy the assembled address (`192.168.1.10`) instead of just the focused block.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('192.168.1.10') },
    template: FULL_TEMPLATE,
  }),
};

export const CopySelect: Story = {
  name: 'Copy with prompt',
  args: { copyMode: 'select' },
  parameters: {
    docs: {
      description: {
        story: '`[copyMode]="select"` shows a "Block / Address" prompt on Ctrl-C so the user picks the copy scope.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('192.168.1.10') },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true },
  parameters: {
    docs: {
      description: {
        story: 'Marks the field as required. Pair with `Validators.required` on the bound control.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — every block is inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: '192.168.1.10', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — blocks are focusable but values cannot be changed.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('192.168.1.10') },
    template: FULL_TEMPLATE,
  }),
};

export const LabelLeft: Story = {
  name: 'Outer label — left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Outer label placed to the left of the field — for dense form layouts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const AsteriskError: Story = {
  name: 'Outer label — asterisk error style',
  args: { outerLabelErrorType: 'astrict-error', required: true },
  parameters: {
    docs: {
      description: {
        story: '`[outerLabelErrorType]="astrict-error"` renders validation state as a red asterisk next to the label.',
      },
    },
  },
  render: (args) => {
    const control = new FormControl(null, Validators.required);
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
};

export const AllModes: Story = {
  name: 'All address modes',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `mode` value.',
      },
    },
  },
  render: () => ({
    props: {
      ipv4Control: new FormControl('192.168.1.10'),
      ipv4MaskControl: new FormControl('10.0.0.0/24'),
      ipv6Control: new FormControl('2001:0db8:85a3:0000:0000:8a2e:0370:7334'),
      macControl: new FormControl('00:1A:2B:3C:4D:5E'),
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 720px;">
        <div>
          <h4 style="margin: 0 0 8px;">IPv4</h4>
          <dx-ip [formControl]="ipv4Control" mode="ipv4" outline="outer-label">
            <p dxLabel>IPv4 address</p>
          </dx-ip>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">IPv4 with mask</h4>
          <dx-ip [formControl]="ipv4MaskControl" mode="ipv4WithMask" outline="outer-label">
            <p dxLabel>Network / mask</p>
          </dx-ip>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">IPv6</h4>
          <dx-ip [formControl]="ipv6Control" mode="ipv6" outline="outer-label">
            <p dxLabel>IPv6 address</p>
          </dx-ip>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">MAC</h4>
          <dx-ip [formControl]="macControl" mode="mac" outline="outer-label">
            <p dxLabel>MAC address</p>
          </dx-ip>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with value, required (touched), disabled, readonly.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        defaultControl: new FormControl(null),
        valueControl: new FormControl('192.168.1.10'),
        requiredControl,
        disabledControl: new FormControl({ value: '192.168.1.10', disabled: true }),
        readonlyControl: new FormControl('192.168.1.10'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-ip [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Address</p>
            </dx-ip>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-ip [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Address</p>
            </dx-ip>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-ip [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Address</p>
            </dx-ip>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-ip [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Address</p>
            </dx-ip>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Readonly</h4>
            <dx-ip [formControl]="readonlyControl" [readonly]="true" outline="outer-label">
              <p dxLabel>Address</p>
            </dx-ip>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Address',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Outer-label projection slot. `dx-ip` does not currently expose hint / error slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-ip
        [formControl]="control"
        [mode]="mode"
        [separator]="separator || null"
        [inputValidation]="inputValidation"
        [highlightInvalidBlocks]="highlightInvalidBlocks"
        [disabledBlocks]="disabledBlocks"
        [copyMode]="copyMode"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [theme]="theme"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
      </dx-ip>
    `,
  }),
};
