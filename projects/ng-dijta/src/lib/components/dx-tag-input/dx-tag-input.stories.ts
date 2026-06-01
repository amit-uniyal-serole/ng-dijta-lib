import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxTagInputComponent } from './dx-tag-input.component';
import { DxTagInputModule } from './dx-tag-input.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Tag Input',
  component: DxTagInputComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTagInputModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Chip-based tag input with autocomplete, inline tag creation, and an embedded color picker. ' +
          'Picks from `[availableTag]` (`Tag[]` — `{ name, colorCode, pkId? }`); typing a name not in ' +
          'the list reveals a "create" option (unless `[disableTagCreation]` is set). Selected tags ' +
          'render as removable chips tinted by `colorCode`. Includes a read-only display variant ' +
          '(`dx-tag`) that shows the first two tags with a "+N" overflow menu for the rest. ' +
          'Implements `ControlValueAccessor` + `Validator` and shares the standard `dx-*` outline / ' +
          'labelPosition / outer-label chrome.',
      },
    },
  },
  argTypes: {
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
    availableTag: { control: 'object', description: 'Suggestion list for autocomplete (`Tag[]`).' },
    palette: { control: 'object', description: 'Color palette offered when creating new tags.' },
    maxlength: { control: 'number', description: 'Max character length of the inline input.' },
    isFilter: { control: 'boolean', description: 'When `true`, filter suggestions against the typed text. When `false`, the "create new" option is always offered.' },
    disableTagCreation: { control: 'boolean', description: 'Hide the inline "create" option — only pre-existing tags can be picked.' },
    allowDelete: { control: 'boolean', description: 'Show the remove (×) button on each chip.' },
    disableCreate: { control: 'boolean', description: 'Disable the inline input — only existing chips visible.' },
    autofocus: { control: 'boolean', description: 'Focus the input on mount.' },
    focus: { control: 'boolean', description: 'Programmatic focus after the control is bound.' },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text inside the input.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Read-only — chips visible, input inert.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    row: { control: 'number', description: 'Maximum visible chip rows before wrapping.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    availableTag: [
      { name: 'Frontend', colorCode: '#3498DB', pkId: 1 },
      { name: 'Backend', colorCode: '#2ECC71', pkId: 2 },
      { name: 'Design', colorCode: '#E91E63', pkId: 3 },
      { name: 'DevOps', colorCode: '#F1C40F', pkId: 4 },
      { name: 'QA', colorCode: '#9B59B6', pkId: 5 },
      { name: 'Docs', colorCode: '#1ABC9C', pkId: 6 },
    ],
    palette: ['#FF5733', '#3498DB', '#2ECC71', '#F1C40F', '#E67E22', '#9B59B6', '#E91E63', '#95A5A6', '#34495E', '#1ABC9C'],
    maxlength: 25,
    isFilter: true,
    disableTagCreation: false,
    allowDelete: true,
    disableCreate: false,
    autofocus: false,
    focus: false,
    tooltip: 'Type to search or create a tag…',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    row: 2,
  },
};

export default meta;
type Story = StoryObj<any>;

const TWO_TAGS = [
  { name: 'Frontend', colorCode: '#3498DB', pkId: 1 },
  { name: 'Design', colorCode: '#E91E63', pkId: 3 },
];

const MANY_TAGS = [
  { name: 'Frontend', colorCode: '#3498DB', pkId: 1 },
  { name: 'Backend', colorCode: '#2ECC71', pkId: 2 },
  { name: 'Design', colorCode: '#E91E63', pkId: 3 },
  { name: 'DevOps', colorCode: '#F1C40F', pkId: 4 },
  { name: 'QA', colorCode: '#9B59B6', pkId: 5 },
];

const FULL_TEMPLATE = `
  <dx-tag-input
    [formControl]="control"
    [availableTag]="availableTag"
    [palette]="palette"
    [maxlength]="maxlength"
    [isFilter]="isFilter"
    [disableTagCreation]="disableTagCreation"
    [allowDelete]="allowDelete"
    [disableCreate]="disableCreate"
    [autofocus]="autofocus"
    [focus]="focus"
    [tooltip]="tooltip"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [row]="row">
    <p dxLabel>Tags</p>
    <dx-label>Tags</dx-label>
  </dx-tag-input>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty tag input. Type to search the suggestion list, or type a brand-new name to reveal the "create" option with color picker.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected tags',
  parameters: {
    docs: {
      description: {
        story: 'Initial chips bound via `FormControl([{ name, colorCode, pkId }])`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(TWO_TAGS) },
    template: FULL_TEMPLATE,
  }),
};

export const DisableCreation: Story = {
  name: 'Disable tag creation',
  args: { disableTagCreation: true },
  parameters: {
    docs: {
      description: {
        story: '`[disableTagCreation]="true"` removes the inline "create new" option — users can only pick from `[availableTag]`. Unmatched typing shows a "No results found" hint.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const AlwaysShowCreate: Story = {
  name: 'Always show "create"',
  args: { isFilter: false },
  parameters: {
    docs: {
      description: {
        story: '`[isFilter]="false"` keeps the "create new" option visible regardless of whether the typed text matches a suggestion.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const LockedChips: Story = {
  name: 'Locked chips (no delete)',
  args: { allowDelete: false },
  parameters: {
    docs: {
      description: {
        story: '`[allowDelete]="false"` hides the chip × button — useful when the parent governs removal via a confirmation step.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(TWO_TAGS) },
    template: FULL_TEMPLATE,
  }),
};

export const InputDisabled: Story = {
  name: 'Existing only (input disabled)',
  args: { disableCreate: true },
  parameters: {
    docs: {
      description: {
        story: '`[disableCreate]="true"` disables the inline input — only existing chips remain visible (read-only-ish but chips still removable).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(TWO_TAGS) },
    template: FULL_TEMPLATE,
  }),
};

export const WithCustomPalette: Story = {
  name: 'Custom color palette',
  args: { palette: ['#0F4C81', '#2D936C', '#E63946', '#F4A261', '#264653'] },
  parameters: {
    docs: {
      description: {
        story: '`[palette]` controls the color choices offered in the inline color picker when creating a new tag.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const TagDisplayMany: Story = {
  name: 'Display-only "dx-tag" (overflow +N)',
  parameters: {
    docs: {
      description: {
        story: 'The read-only `dx-tag` view (formerly its own menu entry) is now demonstrated here. It shows the first two tags inline and collapses the rest behind a "+N" menu — useful for table cells and summary screens.',
      },
    },
  },
  render: () => ({
    props: {
      twoTags: TWO_TAGS,
      manyTags: MANY_TAGS,
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Two tags (fits inline)</h4>
          <dx-tag [tags]="twoTags"></dx-tag>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Five tags ("+3" overflow)</h4>
          <dx-tag [tags]="manyTags"></dx-tag>
        </div>
      </div>
    `,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — `outline="outer-label"` + `[dxLabel]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const FloatingLabel: Story = {
  name: 'Floating label',
  args: { outline: 'floating' },
  parameters: {
    docs: {
      description: {
        story: 'Floating Material label that animates into the outline on focus.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
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
    props: { ...args, control: new FormControl([]) },
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
    props: { ...args, control: new FormControl([], Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled — chips visible but neither editable nor removable.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: TWO_TAGS, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — chips visible, input inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(TWO_TAGS) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(MANY_TAGS) },
    template: FULL_TEMPLATE,
  }),
};

export const NoLabelSlot: Story = {
  name: 'No label slot',
  args: { noneLabel: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneLabel]="true"` collapses the outer-label slot.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
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
    const control = new FormControl([], Validators.required);
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
};

export const MaxLengthCap: Story = {
  name: 'Short max length (10)',
  args: { maxlength: 10 },
  parameters: {
    docs: {
      description: {
        story: '`[maxlength]` caps the inline tag name length — useful for short label conventions.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const AllVariants: Story = {
  name: 'All label variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `outline` value.',
      },
    },
  },
  render: () => ({
    props: {
      availableTag: [],
      noneFloatingControl: new FormControl(TWO_TAGS),
      floatingControl: new FormControl(TWO_TAGS),
      outerLabelControl: new FormControl(TWO_TAGS),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-tag-input [formControl]="noneFloatingControl" [availableTag]="availableTag" outline="none-floating">
            <dx-label>Tags</dx-label>
          </dx-tag-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-tag-input [formControl]="floatingControl" [availableTag]="availableTag" outline="floating">
            <dx-label>Tags</dx-label>
          </dx-tag-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-tag-input [formControl]="outerLabelControl" [availableTag]="availableTag" outline="outer-label">
            <p dxLabel>Tags</p>
          </dx-tag-input>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with values, required (touched), disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl([], Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        availableTag: [],
        defaultControl: new FormControl([]),
        valueControl: new FormControl(TWO_TAGS),
        requiredControl,
        disabledControl: new FormControl({ value: TWO_TAGS, disabled: true }),
        viewOnlyControl: new FormControl(MANY_TAGS),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-tag-input [formControl]="defaultControl" [availableTag]="availableTag" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-tag-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With values</h4>
            <dx-tag-input [formControl]="valueControl" [availableTag]="availableTag" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-tag-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-tag-input [formControl]="requiredControl" [availableTag]="availableTag" [required]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-tag-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-tag-input [formControl]="disabledControl" [availableTag]="availableTag" [disabled]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-tag-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-tag-input [formControl]="viewOnlyControl" [availableTag]="availableTag" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-tag-input>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Tags',
    labelText: 'Tags',
    prefixIcon: 'sell',
    suffixIcon: '',
    hintText: 'Type to search; press Enter or comma to add.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '`<dx-prefix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the label / prefix / suffix / hint / error projection slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: `
      <dx-tag-input
        [formControl]="control"
        [availableTag]="availableTag"
        [palette]="palette"
        [maxlength]="maxlength"
        [isFilter]="isFilter"
        [disableTagCreation]="disableTagCreation"
        [allowDelete]="allowDelete"
        [disableCreate]="disableCreate"
        [tooltip]="tooltip"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [row]="row">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true" *ngIf="prefixIcon">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-tag-input>
    `,
  }),
};
