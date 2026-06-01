import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxCoordinatesComponent } from './dx-coordinates.component';
import { DxCoordinatesModule } from './dx-coordinates.module';
import { Direction } from './directives/coordinates-directive/direction.enum';

const meta: Meta<any> = {
  title: 'Form Inputs/Coordinates',
  component: DxCoordinatesComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCoordinatesModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Geographic coordinate input. Accepts a latitude or longitude in either ' +
          '**Decimal Degrees** (`DD`, e.g. `28.6139`) or **Degrees-Minutes-Seconds** ' +
          '(`DMS`, e.g. `28° 36\' 50.04" N`). The `[direction]` input switches the ' +
          'parser/formatter between latitude (1) and longitude (2). Implements ' +
          '`ControlValueAccessor` + `Validator` so it plugs into reactive and template-driven ' +
          'forms, with three label layouts (`floating` / `none-floating` / `outer-label`).',
      },
    },
  },
  argTypes: {
    coordinateFormat: {
      control: { type: 'inline-radio' },
      options: ['DD', 'DMS'],
      description: 'Input format. `DD` accepts decimal degrees (e.g. `28.6139`). `DMS` accepts degrees-minutes-seconds (e.g. `28° 36\' 50.04" N`). Both produce the same canonical value on the bound form control.',
    },
    direction: {
      control: { type: 'inline-radio' },
      options: [Direction.Latitude, Direction.Longitude],
      description: 'Axis the input represents. `1` (Latitude) accepts ±90°; `2` (Longitude) accepts ±180°. Drives parser bounds and the N/S vs E/W suffix in DMS mode.',
    },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only — focusable but not editable.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — strips the Material form-field chrome.' },
    required: { control: 'boolean', description: 'Mark the field as required. Renders the asterisk in `outer-label` mode.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'top'],
      description: 'Outer-label placement. Only effective with `outline="outer-label"`.',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    tooltip: { control: 'text', description: 'Tooltip / placeholder text.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    coordinateFormat: 'DMS',
    direction: Direction.Latitude,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    tooltip: 'Enter coordinate',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-coordinates
    [formControl]="control"
    [coordinateFormat]="coordinateFormat"
    [direction]="direction"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [tooltip]="tooltip"
    [tabIndex]="tabIndex">
    <div dxLabel>Latitude</div>
    <dx-label>Latitude</dx-label>
  </dx-coordinates>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline latitude input in DMS format.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const DecimalDegrees: Story = {
  name: 'DD — decimal degrees',
  args: { coordinateFormat: 'DD' },
  parameters: {
    docs: {
      description: {
        story: 'Decimal-degree format. Bound value is a plain number string like `28.6139`. Easier to enter from clipboard / scripts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('28.6139') },
    template: FULL_TEMPLATE,
  }),
};

export const DegreesMinutesSeconds: Story = {
  name: 'DMS — degrees / minutes / seconds',
  args: { coordinateFormat: 'DMS' },
  parameters: {
    docs: {
      description: {
        story: 'DMS format. Accepts the traditional `28° 36\' 50.04" N` notation. The hemisphere suffix (N/S/E/W) is derived from `[direction]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(`28° 36' 50.04" N`) },
    template: FULL_TEMPLATE,
  }),
};

export const Longitude: Story = {
  args: { direction: Direction.Longitude },
  parameters: {
    docs: {
      description: {
        story: 'Longitude axis — accepts ±180° and uses E/W suffix in DMS mode. Switch the label accordingly when binding both lat + lng in a form.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(`77° 12' 32.15" E`) },
    template: FULL_TEMPLATE.replace('<div dxLabel>Latitude</div>', '<div dxLabel>Longitude</div>').replace('<dx-label>Latitude</dx-label>', '<dx-label>Longitude</dx-label>'),
  }),
};

export const LatLongPair: Story = {
  name: 'Latitude + Longitude pair',
  parameters: {
    docs: {
      description: {
        story: 'Realistic two-field pattern: pair a latitude input with a longitude input. Each owns its own form control and `[direction]`. Bound to a single object via reactive form group in real use.',
      },
    },
  },
  render: () => ({
    props: {
      latControl: new FormControl('28.6139'),
      lngControl: new FormControl('77.2090'),
      latDirection: Direction.Latitude,
      lngDirection: Direction.Longitude,
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 560px;">
        <dx-coordinates
          [formControl]="latControl"
          coordinateFormat="DD"
          [direction]="latDirection"
          outline="outer-label">
          <div dxLabel>Latitude</div>
        </dx-coordinates>
        <dx-coordinates
          [formControl]="lngControl"
          coordinateFormat="DD"
          [direction]="lngDirection"
          outline="outer-label">
          <p dxLabel>Longitude</p>
        </dx-coordinates>
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
        story: 'Label rendered outside the Material form-field — set `outline="outer-label"` and project the label via `[dxLabel]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
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
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const LabelLeft: Story = {
  name: 'Outer label — left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Outer label placed to the left of the field — useful in dense form layouts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Marks the field as required. Pair with `Validators.required` on the bound control to enforce a value.',
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
        story: 'Disabled control — input is not focusable or editable.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: `28° 36' 50.04" N`, disabled: true }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only control — focusable for screen readers, value cannot change.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(`28° 36' 50.04" N`) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Display-only — used in summary screens. Material chrome stripped.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(`28° 36' 50.04" N`) },
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
      noneFloatingControl: new FormControl(`28° 36' 50.04" N`),
      floatingControl: new FormControl(`28° 36' 50.04" N`),
      outerLabelControl: new FormControl(`28° 36' 50.04" N`),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-coordinates [formControl]="noneFloatingControl" outline="none-floating" coordinateFormat="DMS">
            <dx-label>Latitude</dx-label>
          </dx-coordinates>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-coordinates [formControl]="floatingControl" outline="floating" coordinateFormat="DMS">
            <dx-label>Latitude</dx-label>
          </dx-coordinates>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-coordinates [formControl]="outerLabelControl" outline="outer-label" coordinateFormat="DMS">
            <p dxLabel>Latitude</p>
          </dx-coordinates>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with value, required (touched), disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        defaultControl: new FormControl(null),
        valueControl: new FormControl(`28° 36' 50.04" N`),
        requiredControl,
        disabledControl: new FormControl({ value: `28° 36' 50.04" N`, disabled: true }),
        viewOnlyControl: new FormControl(`28° 36' 50.04" N`),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-coordinates [formControl]="defaultControl" outline="outer-label" coordinateFormat="DMS">
              <p dxLabel>Latitude</p>
            </dx-coordinates>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-coordinates [formControl]="valueControl" outline="outer-label" coordinateFormat="DMS">
              <p dxLabel>Latitude</p>
            </dx-coordinates>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-coordinates [formControl]="requiredControl" [required]="true" outline="outer-label" coordinateFormat="DMS">
              <p dxLabel>Latitude</p>
            </dx-coordinates>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-coordinates [formControl]="disabledControl" [disabled]="true" outline="outer-label" coordinateFormat="DMS">
              <p dxLabel>Latitude</p>
            </dx-coordinates>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-coordinates [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label" coordinateFormat="DMS">
              <p dxLabel>Latitude</p>
            </dx-coordinates>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Latitude',
    labelText: 'Latitude',
    prefixIcon: 'place',
    suffixIcon: 'gps_fixed',
    hintText: 'Format: DDD° MM\' SS.SS" N',
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
        story: 'Demonstrates every content-projection slot: outer label, inner label, prefix icon, suffix icon, hint, and error. Toggle each slot text live from Controls.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-coordinates
        [formControl]="control"
        [coordinateFormat]="coordinateFormat"
        [direction]="direction"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [tooltip]="tooltip"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-coordinates>
    `,
  }),
};
