import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TagComponent } from './tag.component';
import { TagsModule } from './tags.module';

const meta: Meta<TagComponent> = {
  title: 'Data Display/Tag',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [TagsModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Pill / label component (`d-tag`). Three modes: `default` (static label), ' +
          '`checkable` (toggles between checked/unchecked on click — emits `checkedChange`), and ' +
          '`closeable` (shows an × button — emits `tagDelete`, with an optional `beforeDelete` ' +
          'guard returning `boolean | Promise<boolean> | Observable<boolean>`). Colors come from ' +
          'a built-in palette (`[labelStyle]` = `blue-w98` / `aqua-w98` / `olivine-w98` / ' +
          '`green-w98` / `yellow-w98` / `orange-w98` / `red-w98` / `pink-w98` / `purple-w98`) or ' +
          'from `[customColor]` for any CSS color. The companion `d-tags` container renders a ' +
          'list with optional "+N more" overflow (`[hideBeyondTags]`).',
      },
    },
  },
  argTypes: {
    tag: { control: 'text', description: 'Tag label / value (string or any object).' },
    labelStyle: {
      control: { type: 'inline-radio' },
      options: ['', 'blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'red-w98', 'pink-w98', 'purple-w98'],
      description: 'Palette key — picks color + background from the built-in palette.',
    },
    customColor: { control: 'text', description: 'Override color (any CSS string). Wins over `labelStyle`.' },
    mode: {
      control: { type: 'inline-radio' },
      options: ['default', 'checkable', 'closeable'],
      description: '`default` static, `checkable` toggles on click, `closeable` shows ×.',
    },
    checked: { control: 'boolean', description: 'Initial state when `mode="checkable"`.' },
    titleContent: { control: 'text', description: 'Native title (hover tooltip).' },
    maxWidth: { control: 'text', description: 'Max-width CSS value (truncates with ellipsis).' },
    tagDelete: { action: 'tagDelete' },
    checkedChange: { action: 'checkedChange' },
  },
  args: {
    tag: 'Tag label',
    labelStyle: '',
    customColor: '',
    mode: 'default',
    checked: false,
    titleContent: '',
  },
};

export default meta;
type Story = StoryObj<TagComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Single tag (d-tag) variants
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: { docs: { description: { story: 'Plain default tag — no color, no interaction.' } } },
  render: (args) => ({ props: args, template: `<d-tag [tag]="tag" [labelStyle]="labelStyle" [customColor]="customColor" [mode]="mode" [titleContent]="titleContent"></d-tag>` }),
};

export const Palette: Story = {
  name: 'Built-in palette',
  parameters: { docs: { description: { story: 'All nine entries of the built-in `[labelStyle]` palette.' } } },
  render: () => ({
    props: {
      styles: ['blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'red-w98', 'pink-w98', 'purple-w98'],
    },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        <d-tag *ngFor="let s of styles" [tag]="s" [labelStyle]="s"></d-tag>
      </div>
    `,
  }),
};

export const CustomColor: Story = {
  name: 'Custom color',
  args: { tag: 'Custom', customColor: '#0F4C81' },
  parameters: { docs: { description: { story: '`[customColor]` overrides the palette — any CSS color works.' } } },
  render: (args) => ({ props: args, template: `<d-tag [tag]="tag" [customColor]="customColor"></d-tag>` }),
};

export const Checkable: Story = {
  name: 'Checkable mode',
  args: { tag: 'Filter: Active', mode: 'checkable', checked: true, labelStyle: 'green-w98' },
  parameters: { docs: { description: { story: '`mode="checkable"` — click to toggle. Initial state via `[checked]`; emits `(checkedChange)`.' } } },
  render: (args) => ({ props: args, template: `<d-tag [tag]="tag" [labelStyle]="labelStyle" [mode]="mode" [checked]="checked" (checkedChange)="checkedChange($event)"></d-tag>` }),
};

export const Closeable: Story = {
  name: 'Closeable mode',
  args: { tag: 'Removable', mode: 'closeable', labelStyle: 'orange-w98' },
  parameters: { docs: { description: { story: '`mode="closeable"` shows an × button; click → `(tagDelete)`.' } } },
  render: (args) => ({ props: args, template: `<d-tag [tag]="tag" [labelStyle]="labelStyle" [mode]="mode" (tagDelete)="tagDelete($event)"></d-tag>` }),
};

export const CloseableWithGuard: Story = {
  name: 'Closeable with beforeDelete guard',
  parameters: { docs: { description: { story: '`[beforeDelete]` returns `boolean | Promise<boolean> | Observable<boolean>`. Returning `false` cancels the delete — useful for confirmation prompts.' } } },
  render: () => ({
    props: {
      tag: 'Protected',
      beforeDelete: (_t: any) => window.confirm('Really delete this tag?'),
    },
    template: `<d-tag [tag]="tag" labelStyle="red-w98" mode="closeable" [beforeDelete]="beforeDelete"></d-tag>`,
  }),
};

export const Truncated: Story = {
  name: 'Truncated (maxWidth)',
  args: { tag: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', maxWidth: '160px', titleContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', labelStyle: 'purple-w98' },
  parameters: { docs: { description: { story: '`[maxWidth]` clips long labels with ellipsis. Pair with `[titleContent]` for a full-value tooltip.' } } },
  render: (args) => ({ props: args, template: `<d-tag [tag]="tag" [labelStyle]="labelStyle" [maxWidth]="maxWidth" [titleContent]="titleContent"></d-tag>` }),
};

export const Modes: Story = {
  name: 'All modes side-by-side',
  parameters: { docs: { description: { story: 'Default vs checkable vs closeable.' } } },
  render: () => ({
    template: `
      <div style="display:flex; gap:8px; align-items:center;">
        <d-tag tag="Default"   labelStyle="blue-w98"></d-tag>
        <d-tag tag="Checkable" labelStyle="green-w98" mode="checkable" [checked]="true"></d-tag>
        <d-tag tag="Closeable" labelStyle="orange-w98" mode="closeable"></d-tag>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Tag list (d-tags) — absorbed from the deleted tags.stories.ts
// ──────────────────────────────────────────────────────────────────────────

export const TagList: Story = {
  name: 'Tag list (d-tags)',
  parameters: { docs: { description: { story: '`d-tags` renders a list of tags. Pass strings or objects via `[tags]` (+ `[displayProperty]` for object labels). Closing a tag emits `(tagDelete)`.' } } },
  render: () => ({
    props: {
      tags: ['Engineering', 'Design', 'QA', 'DevOps'],
    },
    template: `<d-tags [tags]="tags"></d-tags>`,
  }),
};

export const TagListCloseable: Story = {
  name: 'Tag list — closeable',
  parameters: { docs: { description: { story: 'Each tag becomes removable when `mode="closeable"` is set on the container.' } } },
  render: () => ({
    props: { tags: ['Frontend', 'Backend', 'Docs', 'Infra'] },
    template: `<d-tags [tags]="tags" mode="closeable" (tagDelete)="tagDelete($event)"></d-tags>`,
  }),
};

export const TagListCheckable: Story = {
  name: 'Tag list — checkable (filter chips)',
  parameters: { docs: { description: { story: '`mode="checkable"` turns each tag into a toggle chip — common for filter rails.' } } },
  render: () => ({
    props: { tags: ['Active', 'Inactive', 'Pending', 'Archived'] },
    template: `<d-tags [tags]="tags" mode="checkable" (checkedChange)="checkedChange($event)"></d-tags>`,
  }),
};

export const TagListWithObjects: Story = {
  name: 'Tag list with object payload',
  parameters: { docs: { description: { story: 'When tags are objects, `[displayProperty]` controls which field is rendered as the label.' } } },
  render: () => ({
    props: {
      tags: [
        { id: 1, name: 'Critical' },
        { id: 2, name: 'High' },
        { id: 3, name: 'Medium' },
        { id: 4, name: 'Low' },
      ],
    },
    template: `<d-tags [tags]="tags" displayProperty="name"></d-tags>`,
  }),
};

export const TagListOverflow: Story = {
  name: 'Tag list — overflow ("+N more")',
  parameters: { docs: { description: { story: '`[hideBeyondTags]="true"` measures the container width and collapses overflowing tags into a "+N" indicator.' } } },
  render: () => ({
    props: {
      tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material', 'CDK', 'Storybook', 'Cypress', 'Jest', 'Playwright'],
    },
    template: `
      <div style="max-width:320px;">
        <d-tags [tags]="tags" [hideBeyondTags]="true"></d-tags>
      </div>
    `,
  }),
};
