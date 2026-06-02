export interface ComponentProperty {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export interface ComponentInfo {
  name: string;
  selector: string;
  /** true → navigate to /preview/:selector; false → navigate to /:route */
  routeIsPreview: boolean;
  /** Used only when routeIsPreview = false */
  route?: string;
  description: string;
  properties: ComponentProperty[];
  /** NgModule class name to import, e.g. 'DxButtonModule'. Omit for design-token pages. */
  moduleImport?: string;
  /** npm package path — defaults to '@ngdx/dijta' when moduleImport is set */
  packagePath?: string;
}

export interface ComponentCategory {
  name: string;
  icon: string;
  components: ComponentInfo[];
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    name: 'Foundation',
    icon: 'layers',
    components: [
      {
        name: 'Color Palette',
        selector: 'dx-colors',
        routeIsPreview: false,
        route: 'colors',
        description: 'Design system color tokens — theme palettes (Persian Blue, Tune, Optus), alert colors, and element colors.',
        properties: [
          { name: '--primary-base', type: 'CSS var', default: '#CC0000', description: 'Main brand color used for primary actions and highlights.' },
          { name: '--primary-light', type: 'CSS var', default: '#FF0000', description: 'Lighter primary shade for hover/focus states.' },
          { name: '--primary-dark', type: 'CSS var', default: '#990000', description: 'Darker primary shade for pressed states.' },
          { name: '--two-toned', type: 'CSS var', default: '#f2994a', description: 'Accent color for two-toned illustrations and highlights.' },
          { name: '--secondary-base', type: 'CSS var', default: '#F2994A', description: 'Secondary brand color.' },
          { name: '--alert-success', type: 'CSS var', default: '#27ae60', description: 'Success state color.' },
          { name: '--alert-error', type: 'CSS var', default: '#e94545', description: 'Error state color.' },
          { name: '--alert-warning', type: 'CSS var', default: '#ffa500', description: 'Warning state color.' },
          { name: '--alert-information', type: 'CSS var', default: '#007bff', description: 'Informational state color.' },
          { name: '--alert-notice', type: 'CSS var', default: '#17a2b8', description: 'Notice/info-teal state color.' },
          { name: '--alert-critical', type: 'CSS var', default: '#b00020', description: 'Critical severity color.' },
        ],
      },
      {
        name: 'Type Scale',
        selector: 'dx-typography',
        routeIsPreview: false,
        route: 'typography',
        description: 'Manrope type scale — headings, body, subbody and paragraph styles.',
        properties: [
          { name: 'heading-1', type: 'CSS class', default: '—', description: '32.44px · letter-spacing 0.15px · line-height 1' },
          { name: 'heading-2', type: 'CSS class', default: '—', description: '28.83px · letter-spacing 0px · line-height 1' },
          { name: 'heading-3', type: 'CSS class', default: '—', description: '25.63px · letter-spacing 0px · line-height 1' },
          { name: 'heading-4', type: 'CSS class', default: '—', description: '22.78px · letter-spacing 0.25px · line-height 1' },
          { name: 'heading-5', type: 'CSS class', default: '—', description: '20.25px · letter-spacing 0px · line-height 1' },
          { name: 'heading-6', type: 'CSS class', default: '—', description: '18px · letter-spacing 0.15px · line-height 1' },
          { name: 'body', type: 'CSS class', default: '—', description: '16px · letter-spacing 0.1px · line-height 1' },
          { name: 'subbody', type: 'CSS class', default: '—', description: '14px · letter-spacing 0.1px · line-height 1' },
          { name: 'paragraph', type: 'CSS class', default: '—', description: '12px · letter-spacing 0.46px · line-height 1' },
          { name: 'fw-extralight … fw-extrabold', type: 'CSS class', default: '—', description: 'Weight modifiers: 200 / 300 / 400 / 500 / 600 / 700 / 800' },
        ],
      },
      {
        name: 'Shadow',
        selector: 'dx-shadow',
        routeIsPreview: false,
        route: 'shadow',
        description: '8-level elevation scale from none to 2xl — CSS tokens + .dx-shadow-* utility classes.',
        properties: [
          { name: '--dx-shadow-none', type: 'CSS var', default: '0 0 #0000',  description: 'No shadow.' },
          { name: '--dx-shadow-2xs',  type: 'CSS var', default: '0 1px 1px',  description: 'Barely-there lift — 1 layer, 5% opacity.' },
          { name: '--dx-shadow-xs',   type: 'CSS var', default: '0 1px 2.5px', description: 'Subtle lift — 1 layer, 5% opacity.' },
          { name: '--dx-shadow-sm',   type: 'CSS var', default: '2 layers',   description: 'Small card shadow — 2 layers, 10% opacity.' },
          { name: '--dx-shadow-md',   type: 'CSS var', default: '2 layers',   description: 'Default card shadow — 2 layers, 10% opacity.' },
          { name: '--dx-shadow-lg',   type: 'CSS var', default: '2 layers',   description: 'Prominent card — 2 layers, 10% opacity.' },
          { name: '--dx-shadow-xl',   type: 'CSS var', default: '2 layers',   description: 'Modal / dropdown — 2 layers, 10% opacity.' },
          { name: '--dx-shadow-2xl',  type: 'CSS var', default: '1 layer',    description: 'Hero / overlay — 1 deep layer, 10% opacity.' },
        ],
      },
      {
        name: 'Border Radius',
        selector: 'dx-border-radius',
        routeIsPreview: false,
        route: 'border-radius',
        description: '3-step border-radius scale at 20 px root — sm/md/lg tokens for chips, buttons, cards, and modals.',
        properties: [
          { name: '--dx-radius-sm',   type: 'CSS var',   default: '0.25rem', description: '5 px — chips, small inputs.' },
          { name: '--dx-radius-md',   type: 'CSS var',   default: '0.5rem',  description: '10 px — cards, buttons.' },
          { name: '--dx-radius-lg',   type: 'CSS var',   default: '1rem',    description: '20 px — modals, large surfaces.' },
          { name: '--dx-radius-circle', type: 'CSS var', default: '50%', description: 'Full circle — avatars, icon buttons, dots.' },
        ],
      },
      {
        name: 'Z-Index',
        selector: 'dx-z-index',
        routeIsPreview: false,
        route: 'z-index',
        description: '14-layer z-index scale from hide (-1) to notification (1200) — CSS tokens, SCSS map, and .dx-z-* utility classes.',
        properties: [
          { name: '--dx-z-hide',               type: 'CSS var', default: '-1',   description: 'Visually hidden below stacking context.' },
          { name: '--dx-z-base',               type: 'CSS var', default: '1',    description: 'Default stacked element.' },
          { name: '--dx-z-dropdown',           type: 'CSS var', default: '1000', description: 'Dropdowns and floating menus.' },
          { name: '--dx-z-sticky',             type: 'CSS var', default: '1020', description: 'Sticky headers and columns.' },
          { name: '--dx-z-fixed',              type: 'CSS var', default: '1030', description: 'Fixed positioned bars.' },
          { name: '--dx-z-offcanvas-backdrop', type: 'CSS var', default: '1040', description: 'Offcanvas overlay backdrop.' },
          { name: '--dx-z-offcanvas',          type: 'CSS var', default: '1045', description: 'Offcanvas panel.' },
          { name: '--dx-z-modal-backdrop',     type: 'CSS var', default: '1050', description: 'Modal overlay backdrop.' },
          { name: '--dx-z-modal',              type: 'CSS var', default: '1055', description: 'Modal dialog.' },
          { name: '--dx-z-popover',            type: 'CSS var', default: '1070', description: 'Popovers.' },
          { name: '--dx-z-tooltip',            type: 'CSS var', default: '1080', description: 'Tooltips.' },
          { name: '--dx-z-toast',              type: 'CSS var', default: '1090', description: 'Toast / snackbar notifications.' },
          { name: '--dx-z-loader',             type: 'CSS var', default: '1100', description: 'Full-page loading overlay.' },
          { name: '--dx-z-notification',       type: 'CSS var', default: '1200', description: 'System-level notification banner.' },
        ],
      },
      {
        name: 'Icons',
        selector: 'dx-icon-explorer',
        routeIsPreview: false,
        route: 'icons',
        description: 'dx-icon primitive — token-aligned Material icon wrapper with size scale, font-set variants, and built-in accessibility patterns.',
        properties: [
          { name: 'name',      type: 'string',                                  default: "''",      description: 'Material icon ligature name (e.g. "close", "notifications").' },
          { name: 'svgIcon',   type: 'string',                                  default: "''",      description: 'SVG icon key registered with MatIconRegistry.' },
          { name: 'fontSet',   type: "'filled' | 'outlined' | 'rounded' | 'sharp'", default: "'filled'",   description: 'Material icon font variant.' },
          { name: 'size',      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",       default: "'md'",    description: 'Token-based size step. xs=16px · sm=20px · md=24px · lg=32px · xl=48px.' },
          { name: 'ariaLabel', type: 'string',                                  default: 'undefined', description: 'Accessible label for semantic icons. Removes aria-hidden when set.' },
        ],
      },
      {
        name: 'Padding & Margin',
        selector: 'dx-spacing',
        routeIsPreview: false,
        route: 'spacing',
        description: 'Bootstrap 5 spacing scale (0–5) · $spacers SCSS map · --dx-spacing-* tokens · utility classes.',
        properties: [
          { name: 'p-0 … p-5',         type: 'CSS class', default: '0 → 2rem',    description: 'Sets padding on all sides.' },
          { name: 'pt / pb / ps / pe',  type: 'CSS class', default: '0 → 2rem',    description: 'Sets padding on one side (top, bottom, start, end).' },
          { name: 'px / py',            type: 'CSS class', default: '0 → 2rem',    description: 'Sets padding on horizontal (x) or vertical (y) axis.' },
          { name: 'm-0 … m-5',         type: 'CSS class', default: '0 → 2rem',    description: 'Sets margin on all sides.' },
          { name: 'mt / mb / ms / me',  type: 'CSS class', default: '0 → 2rem',    description: 'Sets margin on one side.' },
          { name: 'mx / my',            type: 'CSS class', default: '0 → 2rem',    description: 'Sets margin on horizontal or vertical axis.' },
          { name: 'gap-0 … gap-5',      type: 'CSS class', default: '0 → 2rem',    description: 'Sets gap for flex and grid containers.' },
          { name: '--dx-spacing-xs',    type: 'CSS var',   default: '0.25rem',      description: 'Maps to step 1 (5 px).' },
          { name: '--dx-spacing-sm',    type: 'CSS var',   default: '0.5rem',       description: 'Maps to step 2 (10 px).' },
          { name: '--dx-spacing-md',    type: 'CSS var',   default: '1rem',         description: 'Maps to step 3 (20 px).' },
          { name: '--dx-spacing-lg',    type: 'CSS var',   default: '1.5rem',       description: 'Maps to step 4 (30 px).' },
          { name: '--dx-spacing-xl',    type: 'CSS var',   default: '2rem',         description: 'Maps to step 5 (40 px).' },
        ],
      },
    ],
  },
  {
    name: 'Form Inputs',
    icon: 'edit',
    components: [
      {
        name: 'Input',
        selector: 'dx-input',
        routeIsPreview: true,
        description: 'Text input with floating and outline label modes.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Display mode — floating (default) or outer label.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input field.' },
          { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
          { name: 'required', type: 'boolean', default: 'false', description: 'Marks field as required.' },
        ],
      },
      {
        name: 'Select',
        selector: 'dx-select',
        routeIsPreview: true,
        description: 'Dropdown select wrapping Angular Material mat-select.',
        properties: [
          { name: 'options', type: 'KeyValueModel[]', default: '[]', description: 'List of options to display.', required: true },
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple selection.' },
        ],
      },
      {
        name: 'Autocomplete Select',
        selector: 'dx-autocomplete-select',
        routeIsPreview: true,
        description: 'Searchable autocomplete dropdown.',
        properties: [
          { name: 'options', type: 'KeyValueModel[]', default: '[]', description: 'List of options to filter.', required: true },
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field.' },
        ],
      },
      {
        name: 'Chip Autocomplete',
        selector: 'dx-chip-autocomplete',
        routeIsPreview: true,
        description: 'Multi-value chip-based autocomplete input.',
        properties: [
          { name: 'options', type: 'KeyValueModel[]', default: '[]', description: 'Options to autocomplete from.', required: true },
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        ],
      },
      {
        name: 'Chip Select',
        selector: 'dx-chip-select',
        routeIsPreview: true,
        description: 'Chip-style multi-select.',
        properties: [
          { name: 'options', type: 'KeyValueModel[]', default: '[]', description: 'Options to select from.', required: true },
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        ],
      },
      {
        name: 'Tag Input',
        selector: 'dx-tag-input',
        routeIsPreview: true,
        description: 'Free-form tag/chip entry.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field.' },
        ],
      },
      {
        name: 'Checkbox',
        selector: 'dx-checkbox',
        routeIsPreview: true,
        description: 'Checkbox wrapping Angular Material mat-checkbox.',
        properties: [
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows indeterminate state.' },
        ],
      },
      {
        name: 'Radio Button',
        selector: 'dx-radio-button',
        routeIsPreview: true,
        description: 'Radio button group.',
        properties: [
          { name: 'options', type: 'KeyValueModel[]', default: '[]', description: 'Radio options list.', required: true },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all radio buttons.' },
        ],
      },
      {
        name: 'Textarea',
        selector: 'dx-textarea',
        routeIsPreview: true,
        description: 'Auto-growing textarea with label support.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'rows', type: 'number', default: '3', description: 'Initial row height.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
        ],
      },
      {
        name: 'Number',
        selector: 'dx-number',
        routeIsPreview: true,
        description: 'Numeric input with localization.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'min', type: 'number', default: 'undefined', description: 'Minimum value.' },
          { name: 'max', type: 'number', default: 'undefined', description: 'Maximum value.' },
        ],
      },
      {
        name: 'Currency',
        selector: 'dx-input-currency',
        routeIsPreview: true,
        description: 'Currency amount input.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'currencyCode', type: 'string', default: "'USD'", description: 'ISO 4217 currency code.' },
        ],
      },
      {
        name: 'Phone',
        selector: 'dx-input-phone',
        routeIsPreview: true,
        description: 'Phone number input with country code picker.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'defaultCountry', type: 'string', default: "'us'", description: 'Default country code.' },
        ],
      },
      {
        name: 'URL Input',
        selector: 'dx-input-url',
        routeIsPreview: true,
        description: 'URL-validated input field.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        ],
      },
      {
        name: 'Image Input',
        selector: 'dx-image-input',
        routeIsPreview: true,
        description: 'Image upload input with preview.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'accept', type: 'string', default: "'image/*'", description: 'Accepted file types.' },
        ],
      },
      {
        name: 'Coordinates',
        selector: 'dx-coordinates',
        routeIsPreview: true,
        description: 'Latitude/longitude coordinate input.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field.' },
        ],
      },
    ],
  },
  {
    name: 'Date & Time',
    icon: 'calendar_today',
    components: [
      {
        name: 'Date Picker',
        selector: 'dx-datepicker',
        routeIsPreview: true,
        description: 'Calendar date picker.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'minDate', type: 'Date', default: 'undefined', description: 'Minimum selectable date.' },
          { name: 'maxDate', type: 'Date', default: 'undefined', description: 'Maximum selectable date.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
        ],
      },
      {
        name: 'Date Range',
        selector: 'dx-daterange',
        routeIsPreview: true,
        description: 'Date range (start + end) picker.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both pickers.' },
        ],
      },
      {
        name: 'Date Time Picker',
        selector: 'dx-datetime-picker',
        routeIsPreview: true,
        description: 'Combined date and time picker.',
        properties: [
          { name: 'outline', type: "'outer-label' | ''", default: "''", description: 'Label display mode.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
        ],
      },
      {
        name: 'Time Picker',
        selector: 'dx-time-picker-input',
        routeIsPreview: true,
        description: 'Standalone time entry with 12h/24h mode.',
        properties: [
          { name: 'mode', type: "'12h' | '24h'", default: "'24h'", description: 'Clock mode.' },
          { name: 'anteMeridiemAbbreviation', type: 'string', default: "'AM'", description: 'AM label.' },
          { name: 'postMeridiemAbbreviation', type: 'string', default: "'PM'", description: 'PM label.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        ],
      },
      {
        name: 'Activity Calendar',
        selector: 'dx-activity-calendar',
        routeIsPreview: false,
        route: 'calendar',
        moduleImport: 'DxActivityCalendarModule',
        description: 'GitHub-style contribution heatmap calendar.',
        properties: [
          { name: 'data', type: 'ActivityData[]', default: '[]', description: 'Array of date-activity entries.' },
          { name: 'year', type: 'number', default: 'current year', description: 'Year to display.' },
          { name: 'colorScheme', type: 'string[]', default: "['#ebedf0', ...]", description: 'Heat-map color steps.' },
        ],
      },
    ],
  },
  {
    name: 'Buttons & Actions',
    icon: 'touch_app',
    components: [
      {
        name: 'Button',
        selector: 'dx-button',
        routeIsPreview: false,
        route: 'button',
        moduleImport: 'DxButtonModule',
        description: 'Primary action button with optional multi-action dropdown.',
        properties: [
          { name: 'title', type: 'string', default: 'undefined', description: 'Button label text.', required: true },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
          { name: 'icon', type: 'string', default: 'undefined', description: 'Material icon name shown before label.' },
          { name: 'size', type: "'small' | 'big' | ''", default: "''", description: 'Size variant.' },
          { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows loading spinner.' },
          { name: 'loaderType', type: "'semi-circle' | 'dots'", default: "'semi-circle'", description: 'Loader animation style.' },
          { name: 'dxType', type: "'primary' | 'default'", default: "'primary'", description: 'Button style variant.' },
          { name: 'color', type: 'string', default: 'undefined', description: 'Custom button color override.' },
          { name: 'show', type: 'boolean', default: 'true', description: 'Toggles button visibility.' },
        ],
      },
    ],
  },
  {
    name: 'Data Display',
    icon: 'grid_view',
    components: [
      {
        name: 'Card',
        selector: 'dx-card',
        routeIsPreview: false,
        route: 'card',
        moduleImport: 'DxCardModule',
        description: 'Elevated content card container.',
        properties: [
          { name: 'title', type: 'string', default: 'undefined', description: 'Card heading text.' },
          { name: 'subtitle', type: 'string', default: 'undefined', description: 'Card sub-heading.' },
          { name: 'noPadding', type: 'boolean', default: 'false', description: 'Removes card body padding.' },
        ],
      },
      {
        name: 'Table',
        selector: 'dx-table',
        routeIsPreview: false,
        route: 'table',
        moduleImport: 'FlexTableModule',
        description: 'Data table with pagination, sorting, and row actions.',
        properties: [
          { name: 'data', type: 'any[]', default: '[]', description: 'Row data array.', required: true },
          { name: 'columns', type: 'ColumnDef[]', default: '[]', description: 'Column definitions.', required: true },
          { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading skeleton.' },
          { name: 'multiSelect', type: 'boolean', default: 'false', description: 'Enables row checkboxes.' },
          { name: 'singleRowSelect', type: 'boolean', default: 'false', description: 'Enables single-row selection.' },
          { name: 'pagination', type: 'boolean', default: 'true', description: 'Shows paginator.' },
        ],
      },
    ],
  },
  {
    name: 'Layout & Navigation',
    icon: 'view_sidebar',
    components: [
      {
        name: 'Expansion Panel',
        selector: 'mat-expansion-panel',
        routeIsPreview: false,
        route: 'expansion',
        moduleImport: 'MatExpansionModule',
        packagePath: '@angular/material/expansion',
        description: 'Collapsible section using Angular Material expansion panel.',
        properties: [
          { name: 'expanded', type: 'boolean', default: 'false', description: 'Whether the panel starts open.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents expand/collapse.' },
          { name: 'hideToggle', type: 'boolean', default: 'false', description: 'Hides the expand arrow.' },
        ],
      },
    ],
  },
  {
    name: 'Filters & Search',
    icon: 'filter_list',
    components: [
      {
        name: 'Criteria Filter',
        selector: 'dx-criteria-filter',
        routeIsPreview: false,
        route: 'criteria',
        moduleImport: 'DxCriteriaFilterModule',
        description: 'Advanced criteria-based filter builder.',
        properties: [
          { name: 'fields', type: 'CriteriaField[]', default: '[]', description: 'Filterable field definitions.', required: true },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Makes all criteria read-only.' },
        ],
      },
    ],
  },
];
