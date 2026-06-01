# ng-dijta Component Library - Complete Feature Documentation

**Generated:** 2026-01-12  
**Total Components:** 83+ components  
**Library:** ng-dijta - Angular Component Library

---

## Table of Contents

1. [Overview](#overview)
2. [Component Categories](#component-categories)
3. [Detailed Component Features](#detailed-component-features)
4. [Common Features](#common-features)
5. [Integration Guide](#integration-guide)

---

## Overview

ng-dijta is a comprehensive Angular component library providing enterprise-ready UI components for building modern web applications. The library includes 80+ components covering inputs, data displays, navigation, layouts, and utilities.

### Key Highlights

- **80+ Production-Ready Components**
- **Material Design Integration**
- **Full TypeScript Support**
- **Reactive & Template-Driven Forms**
- **Accessibility (ARIA) Compliant**
- **Responsive & Mobile-Friendly**
- **Internationalization Ready**
- **Customizable Theming**

---

## Component Categories

### 1. Input Components (25+)
Form inputs, selectors, pickers, and text entry components

### 2. Data Display Components (15+)
Tables, cards, lists, charts, and visualization components

### 3. Navigation Components (10+)
Menus, tabs, breadcrumbs, and navigation utilities

### 4. Layout Components (8+)
Page layouts, headers, footers, and structural components

### 5. Utility Components (25+)
Modals, loaders, notifications, and helper components

---

## Detailed Component Features

### Input Components

#### dx-input
**Purpose:** Comprehensive text input with advanced features  
**Selector:** `<dx-input>`  
**Key Features:**
- Multiple input types (text, number, email, password, etc.)
- Input masking with special characters
- Currency formatting and positioning
- Autocomplete integration
- Mention suggestions (@user style)
- Three outline modes: floating, none-floating, outer-label
- Label positioning (top, left)
- Read-only and view-only modes
- Min/max length validation
- Tooltip support
- Custom error display modes
- Prefix/suffix support

**Inputs:** 29 | **Outputs:** 4

---

#### dx-autocomplete-select
**Purpose:** Advanced select with search and multi-select  
**Selector:** `<dx-autocomplete-select>`  
**Key Features:**
- Search/filter options with autocomplete
- Single and multiple selection modes
- Create new options on-the-fly
- Country flag display support
- Empty option support
- Three outline styles: floating, none-floating, outer-label
- Label positioning options
- Read-only and view-only modes
- Loading state indicator
- Tooltip on options
- Custom error display
- Tab navigation support

**Inputs:** 20 | **Outputs:** 5

---

#### dx-datepicker
**Purpose:** Date selection with calendar interface  
**Selector:** `<dx-datepicker>`  
**Key Features:**
- Multiple date formats
- Min and max date restrictions
- Read-only and view-only modes
- Disabled state support
- Custom placeholder
- Three outline modes
- Label positioning options
- Form validation integration
- Keyboard navigation
- Touch-friendly interface

**Inputs:** 15 | **Outputs:** 1

---

#### dx-datetime-picker
**Purpose:** Combined date and time picker  
**Selector:** `<dx-datetime-picker>`  
**Key Features:**
- Date and time selection in one component
- 12-hour and 24-hour time formats
- Min/max date and time restrictions
- Timezone support
- Custom date/time formats
- Read-only and view-only modes
- Form validation
- Keyboard shortcuts

**Inputs:** 23 | **Outputs:** 1

---

#### dx-time-picker
**Purpose:** Time selection with clock interface  
**Selector:** `<input matTimepicker>` or `<dx-time-picker-input>`  
**Key Features:**
- Clock-based time selection interface
- 12-hour and 24-hour modes
- Min and max time restrictions
- Keyboard input support
- Dialog-based picker
- Inline input component variant
- Custom OK/Cancel labels
- AM/PM abbreviation customization
- Strict mode for time validation
- Form validation integration

**Inputs:** 15+ | **Outputs:** 2

---

#### dx-daterange
**Purpose:** Date range selection  
**Selector:** `<dx-daterange>`  
**Key Features:**
- Start and end date selection
- Preset ranges (Today, Last 7 days, etc.)
- Min/max date restrictions
- Custom date formats
- Single calendar or dual calendar view
- Read-only and view-only modes

**Inputs:** 13 | **Outputs:** 1

---

#### dx-number
**Purpose:** Numeric input with formatting  
**Selector:** `<dx-number>`  
**Key Features:**
- Numeric validation
- Decimal places control
- Min/max value restrictions
- Step increment/decrement
- Thousand separators
- Negative number support
- Currency formatting
- Read-only and view-only modes

**Inputs:** 20 | **Outputs:** 1

---

#### dx-currency
**Purpose:** Currency input with formatting  
**Selector:** `<dx-currency>`  
**Key Features:**
- Currency symbol positioning
- Multiple currency formats
- Decimal places control
- Thousand separators
- Currency code support
- Exchange rate display
- Validation support

**Inputs:** 5 | **Outputs:** 0

---

#### dx-textarea
**Purpose:** Multi-line text input  
**Selector:** `<dx-textarea>`  
**Key Features:**
- Auto-resize functionality
- Min/max rows configuration
- Character count display
- Max length validation
- Read-only and view-only modes
- Rich text support
- Mention support
- Emoji support

**Inputs:** 20 | **Outputs:** 1

---

#### dx-checkbox
**Purpose:** Checkbox input  
**Selector:** `<dx-checkbox>`  
**Key Features:**
- Read-only and view-only modes
- Indeterminate state
- Custom label positioning
- Validation support
- Group checkbox support
- Event-driven interaction

**Inputs:** 7 | **Outputs:** 2

---

#### dx-radio-button
**Purpose:** Radio button input  
**Selector:** `<dx-radio-button>`  
**Key Features:**
- Radio group support
- Custom layouts (horizontal/vertical)
- Disabled state
- Read-only and view-only modes
- Validation support

**Inputs:** 5 | **Outputs:** 1

---

#### dx-toggle
**Purpose:** Toggle switch  
**Selector:** `<dx-toggle>`  
**Key Features:**
- Smooth toggle animation
- Custom labels (on/off)
- Disabled state
- Read-only mode
- Form validation
- Size variants

**Inputs:** 8 | **Outputs:** 1

---

#### dx-select
**Purpose:** Standard dropdown select  
**Selector:** `<dx-select>`  
**Key Features:**
- Single and multiple selection
- Option groups
- Custom option templates
- Search/filter
- Read-only and view-only modes
- Validation support

**Inputs:** 15 | **Outputs:** 2

---

#### dx-chip-select
**Purpose:** Chip-based multi-select  
**Selector:** `<dx-chip-select>`  
**Key Features:**
- Visual chip representation
- Add/remove chips
- Custom chip colors
- Disabled state
- Read-only and view-only modes
- Max chips limit

**Inputs:** 14 | **Outputs:** 0

---

#### dx-chip-autocomplete
**Purpose:** Autocomplete with chip display  
**Selector:** `<dx-chip-autocomplete>`  
**Key Features:**
- Autocomplete search
- Multi-selection as chips
- Create new options
- Loading state indicator
- Custom chip templates
- Remove chips functionality

**Inputs:** 14 | **Outputs:** 3

---

#### dx-tag-input
**Purpose:** Tag input with custom tag creation  
**Selector:** `<dx-tag-input>`  
**Key Features:**
- Free-form tag creation
- Tag validation
- Duplicate prevention
- Max tags limit
- Custom tag colors
- Autocomplete suggestions
- Read-only and view-only modes

**Inputs:** 26 | **Outputs:** 1

---

#### dx-input-chips
**Purpose:** Multi-value chip input  
**Selector:** `<dx-input-chips>`  
**Key Features:**
- Multiple chip values
- Add/remove chips
- Validation per chip
- Custom separators
- Read-only and view-only modes

**Inputs:** 16 | **Outputs:** 1

---

#### dx-coordinates
**Purpose:** Geographic coordinates input  
**Selector:** `<dx-coordinates>`  
**Key Features:**
- Latitude/longitude input
- DD and DMS format support
- Direction selection (N/S, E/W)
- Validation for coordinate ranges
- Map integration support
- Tooltip support

**Inputs:** 13 | **Outputs:** 1

---

#### dx-ip
**Purpose:** IP address input  
**Selector:** `<dx-ip>`  
**Key Features:**
- IPv4 format validation
- Auto-focus next segment
- Paste support
- Custom styling

**Inputs:** 6 | **Outputs:** 0

---

#### dx-input-email
**Purpose:** Email input with validation  
**Selector:** `<dx-input-email>`  
**Key Features:**
- Email format validation
- Multiple email support
- Autocomplete suggestions
- Read-only and view-only modes
- Tooltip support

**Inputs:** 21 | **Outputs:** 1

---

#### dx-input-phone
**Purpose:** Phone number input with formatting  
**Selector:** `<dx-input-phone>`  
**Key Features:**
- International phone format
- Country code selector
- Auto-formatting
- Multiple phone numbers
- Contact integration
- Read-only and view-only modes

**Inputs:** 28 | **Outputs:** 2

---

#### dx-input-url
**Purpose:** URL input with validation  
**Selector:** `<dx-input-url>`  
**Key Features:**
- URL format validation
- Protocol prefix auto-add
- Link preview
- Read-only and view-only modes
- Tooltip support

**Inputs:** 16 | **Outputs:** 2

---

#### dx-input-name
**Purpose:** Name input with formatting  
**Selector:** `<dx-input-name>`  
**Key Features:**
- First/middle/last name fields
- Auto-capitalization
- Prefix/suffix support
- Validation rules
- Read-only and view-only modes

**Inputs:** 13 | **Outputs:** 1

---

#### dx-input-dob
**Purpose:** Date of birth input  
**Selector:** `<dx-input-dob>`  
**Key Features:**
- Age calculation
- Min/max age restrictions
- Date format customization
- Validation
- Read-only and view-only modes

**Inputs:** 15 | **Outputs:** 1

---

#### dx-input-company
**Purpose:** Company name input  
**Selector:** `<dx-input-company>`  
**Key Features:**
- Company lookup
- Autocomplete suggestions
- Validation
- Read-only and view-only modes

**Inputs:** 12 | **Outputs:** 1

---

#### dx-input-icon
**Purpose:** Icon selection input  
**Selector:** `<dx-input-icon>`  
**Key Features:**
- Icon picker integration
- Icon preview
- Search icons
- Read-only and view-only modes

**Inputs:** 15 | **Outputs:** 1

---

#### dx-input-label
**Purpose:** Input with custom label  
**Selector:** `<dx-input-label>`  
**Key Features:**
- Custom label positioning
- Required indicator
- Validation display
- Disabled state

**Inputs:** 8 | **Outputs:** 1

---

#### dx-input-datepicker
**Purpose:** Date input with picker  
**Selector:** `<dx-input-datepicker>`  
**Key Features:**
- Date picker integration
- Custom formats
- Validation
- Disabled state

**Inputs:** 8 | **Outputs:** 1

---

### Data Display Components

#### dx-table-view-wrapper
**Purpose:** Multi-view data display (table/canvas)  
**Selector:** `<dx-table-view-wrapper>`  
**Key Features:**
- Dual view modes: Table and Canvas
- Column configuration support
- Built-in pagination
- Sorting capabilities
- Row/item selection with checkboxes
- Filter integration
- Avatar support in displays
- Action buttons per view
- Custom templates support
- Loading state indicators
- Page size configuration
- Event-driven architecture for all interactions

**Inputs:** 10 | **Outputs:** 13

---

#### dx-nested-table (dx-treetable)
**Purpose:** Hierarchical tree table  
**Selector:** `<dx-treetable>`  
**Key Features:**
- Hierarchical data display in table format
- Expand/collapse functionality for nested rows
- Column configuration support
- Customizable column templates
- Loading state indicator
- Fixed height with scrolling
- Footer support
- Node click events
- Search and filter capabilities

**Inputs:** 6 | **Outputs:** 1

---

#### dx-card
**Purpose:** Versatile card container  
**Selector:** `<dx-card>`  
**Key Features:**
- Multiple card variants (list, details, form)
- Accordion content support
- Action buttons
- Profile display
- Currency and date formatting
- Email and URL display
- Image support
- Checkbox integration
- Custom content areas

**Inputs:** 2 | **Outputs:** 0

---

#### dx-chart
**Purpose:** Chart visualization wrapper  
**Selector:** `<dx-chart>`  
**Key Features:**
- Multiple chart types support (built on ECharts)
- Responsive design
- Theme customization
- Interactive tooltips
- Data-driven updates
- Export capabilities
- Event handling for chart interactions

**Inputs:** 2 | **Outputs:** 1

---

#### dx-chart-tile
**Purpose:** Chart tile component  
**Selector:** `<dx-chart-tile>`  
**Key Features:**
- Chart display in tile format
- Custom styling options
- Responsive layout

**Inputs:** 2 | **Outputs:** 0

---

#### dx-basic-tile
**Purpose:** Basic tile display  
**Selector:** `<dx-basic-tile>`  
**Key Features:**
- Simple tile layout
- Click events
- Custom content projection

**Inputs:** 1 | **Outputs:** 1

---

#### dx-config-table
**Purpose:** Configuration table  
**Selector:** `<dx-config-table>`  
**Key Features:**
- Key-value pair display
- Edit configuration
- Add/remove entries
- Event-driven interaction

**Inputs:** 1 | **Outputs:** 3

---

#### dx-dual-listbox
**Purpose:** Dual list selection  
**Selector:** `<dx-dual-listbox>`  
**Key Features:**
- Move items between lists
- Search/filter in lists
- Select multiple items
- Order items
- Event-driven selection

**Inputs:** 6 | **Outputs:** 2

---

#### dx-kanban-view
**Purpose:** Kanban board  
**Selector:** `<dx-kanban-view>`  
**Key Features:**
- Drag-and-drop between columns
- Customizable card templates
- Column configuration
- Event handling for card movements
- Add/remove cards functionality
- Column-based organization
- Responsive layout

**Inputs:** 1 | **Outputs:** 3

---

#### dx-tree
**Purpose:** Tree view  
**Selector:** `<dx-tree>`  
**Key Features:**
- Hierarchical data display
- Expand/collapse nodes
- Node selection support
- Custom node templates
- Event-driven node interactions
- Icon support for nodes
- Lazy loading support
- Search/filter capabilities

**Inputs:** 8 | **Outputs:** 2

---

#### dx-tree-v2
**Purpose:** Enhanced tree view  
**Selector:** `<dx-tree-v2>`  
**Key Features:**
- Improved performance
- Virtual scrolling
- Advanced node operations
- Multiple selection modes
- Drag and drop
- Extensive event handling

**Inputs:** 3 | **Outputs:** 17

---

#### dx-avatar
**Purpose:** User avatar display  
**Selector:** `<ndx-avatar>`  
**Key Features:**
- Image or initials display
- Size variants
- Shape options (circle, square)
- Badge support
- Status indicator
- Group avatar support
- Fallback handling

**Inputs:** 17 | **Outputs:** 2

---

#### dx-qrcode
**Purpose:** QR code generator  
**Selector:** `<dx-qrcode>`  
**Key Features:**
- Generate QR codes
- Custom colors
- Size configuration
- Image embedding
- Canvas or SVG output
- Error correction levels

**Inputs:** 17 | **Outputs:** 1

---

#### dx-status
**Purpose:** Status indicator  
**Selector:** `<dx-status>`  
**Key Features:**
- Visual status display
- Color coding
- Icon support
- Text labels
- Click events

**Inputs:** 5 | **Outputs:** 1

---

#### dx-tag
**Purpose:** Tag display  
**Selector:** `<d-tag>`  
**Key Features:**
- Visual tag representation
- Color variants
- Close button
- Click events
- Custom styling

**Inputs:** 9 | **Outputs:** 2

---

#### dx-activity-calendar
**Purpose:** Activity calendar heatmap  
**Selector:** `<dx-activity-calendar>`  
**Key Features:**
- Heatmap visualization
- Date range selection
- Activity intensity display
- Tooltip on hover
- Custom color schemes
- Click events on dates

**Inputs:** 11 | **Outputs:** 8

---

### Navigation Components

#### dx-navigation-menu
**Purpose:** Navigation menu with accordion  
**Selector:** `<dx-navigation-menu>`  
**Key Features:**
- Accordion-style menu
- Nested menu items support
- Icon support
- Active item highlighting
- Event-driven navigation
- Collapsible sections

**Inputs:** 2 | **Outputs:** 1

---

#### dx-breadcrumb
**Purpose:** Breadcrumb navigation  
**Selector:** `<app-ng7-mat-breadcrumb>`  
**Key Features:**
- Automatic breadcrumb generation
- Custom separators
- Click navigation
- Dynamic updates
- Home icon support

**Inputs:** 5 | **Outputs:** 0

---

#### dx-tab-group
**Purpose:** Tab container  
**Selector:** `<dx-tab-group>`  
**Key Features:**
- Multiple tab support
- Custom tab headers
- Lazy loading of tab content
- Active tab management
- Tab selection events
- Icon support in tabs
- Disabled tabs
- Dynamic tab creation

**Inputs:** 8 | **Outputs:** 2

---

#### tab
**Purpose:** Basic tab component  
**Selector:** `<d-tab:not(p)>`  
**Key Features:**
- Tab content container
- Disabled state
- Custom templates

**Inputs:** 4 | **Outputs:** 0

---

#### dx-page-content-menu
**Purpose:** Page content navigation menu  
**Selector:** `<dx-content-menu-accrodian>`  
**Key Features:**
- Content section navigation
- Accordion style
- Auto-scroll to sections
- Active section tracking

**Inputs:** 2 | **Outputs:** 1

---

#### dx-sidebar
**Purpose:** Sidebar navigation  
**Key Features:**
- Collapsible sidebar
- Vertical and horizontal modes
- Nested menu support
- Icon support
- Active item tracking

---

### Layout Components

#### dx-layout
**Purpose:** Page layout wrapper  
**Selector:** `<dx-layout-content>`  
**Key Features:**
- Standard page layout
- Header/footer/sidebar integration
- Responsive layout
- Multiple layout modes (vertical, horizontal, compact)

**Inputs:** 0 | **Outputs:** 0

---

#### dx-header
**Purpose:** Page header  
**Selector:** `<dx-header>`  
**Key Features:**
- Logo display
- Navigation integration
- User profile menu
- Notification center
- Search bar
- Theme toggle
- Responsive design

**Inputs:** 8 | **Outputs:** 10

---

#### dx-footer
**Purpose:** Page footer  
**Selector:** `<dx-footer>`  
**Key Features:**
- Footer content display
- Links support
- Copyright information
- Responsive layout

**Inputs:** 1 | **Outputs:** 0

---

#### dx-content
**Purpose:** Content container  
**Selector:** `<dx-content>`  
**Key Features:**
- Content area wrapper
- Padding configuration
- Scrollable content

**Inputs:** 1 | **Outputs:** 0

---

#### dx-drawer
**Purpose:** Drawer/side panel  
**Selector:** `<dx-drawer>`  
**Key Features:**
- Slide-out panel
- Position configuration (left, right, top, bottom)
- Overlay or push mode
- Auto-close on outside click
- Backdrop support

**Inputs:** 10 | **Outputs:** 3

---

### Utility Components

#### dx-button
**Purpose:** Versatile button component  
**Selector:** `<dx-button>`  
**Key Features:**
- Multiple button styles (primary, default)
- Icon support with customizable positioning
- Loading state with different loader types
- Multi-action dropdown menu
- Confirmation popover before action execution
- Size variants (small, big, default)
- Permission-based visibility
- Condition-based styling
- Disabled state support

**Inputs:** 19 | **Outputs:** 2

---

#### dx-popup
**Purpose:** Popup/modal dialog  
**Selector:** `<dx-popup>`  
**Key Features:**
- Modal dialog
- Custom content
- Close on backdrop
- Action buttons
- Responsive sizing

**Inputs:** 0 | **Outputs:** 0

---

#### modal
**Purpose:** Modal container  
**Selector:** `<d-modal-container>`  
**Key Features:**
- Full modal system
- Header, body, footer sections
- Overlay support
- Close handling
- Size variants

**Inputs:** 11 | **Outputs:** 0

---

#### dx-confirm
**Purpose:** Confirmation dialog  
**Selector:** `<dx-confirm>`  
**Key Features:**
- Confirmation prompt
- Custom messages
- OK/Cancel buttons
- Promise-based response

**Inputs:** 0 | **Outputs:** 0

---

#### dx-loader
**Purpose:** Loading indicator  
**Selector:** `<dx-loader>`  
**Key Features:**
- Multiple loader types
- Size configuration
- Color customization
- Overlay support
- Full-screen mode

**Inputs:** 11 | **Outputs:** 0

---

#### dx-skeleton-loader
**Purpose:** Content skeleton loader  
**Selector:** `<dx-skeleton-loader>`  
**Key Features:**
- Skeleton placeholder
- Multiple shape variants
- Animation effects
- Responsive sizing

**Inputs:** 6 | **Outputs:** 0

---

#### loading
**Purpose:** Loading backdrop  
**Selector:** `<d-loading-backdrop>`  
**Key Features:**
- Full-screen loading
- Backdrop overlay
- Message display

**Inputs:** 3 | **Outputs:** 0

---

#### dx-notification
**Purpose:** Notification center  
**Selector:** `<dx-notifications>`  
**Key Features:**
- Notification list
- Mark as read
- Delete notifications
- Notification badges

**Inputs:** 0 | **Outputs:** 3

---

#### dx-toastr
**Purpose:** Toast notifications  
**Key Features:**
- Success/error/warning/info toasts
- Auto-dismiss
- Position configuration
- Progress bar
- Action buttons

---

#### dx-alert-message
**Purpose:** Alert banner  
**Selector:** `<dx-alert-message>`  
**Key Features:**
- Alert types (success, warning, error, info)
- Dismissible
- Icon support
- Custom content

**Inputs:** 2 | **Outputs:** 0

---

#### dx-empty
**Purpose:** Empty state display  
**Selector:** `<dx-embed-empty>`  
**Key Features:**
- Empty state messaging
- Icon display
- Action buttons
- Custom content

**Inputs:** 0 | **Outputs:** 0

---

#### dx-tooltip
**Purpose:** Tooltip directive  
**Key Features:**
- Hover tooltip
- Position configuration
- Custom styling
- HTML content support

---

#### dx-popover
**Purpose:** Popover component  
**Key Features:**
- Click-triggered popover
- Custom content
- Position configuration
- Close handling

---

#### dx-popconfirm
**Purpose:** Popover confirmation  
**Key Features:**
- Confirmation in popover
- Yes/No buttons
- Custom messages

---

#### dx-sticky
**Purpose:** Sticky positioning  
**Selector:** `<dx-sticky>`  
**Key Features:**
- Sticky header/footer
- Offset configuration
- Z-index control

**Inputs:** 5 | **Outputs:** 1

---

#### dx-fullscreen
**Purpose:** Fullscreen mode  
**Selector:** `<dx-fullscreen>`  
**Key Features:**
- Toggle fullscreen
- Exit fullscreen event
- Browser compatibility

**Inputs:** 5 | **Outputs:** 1

---

#### dx-floater-button
**Purpose:** Floating action button  
**Selector:** `<dx-floater-button>`  
**Key Features:**
- Fixed position FAB
- Multiple actions
- Expand/collapse
- Position configuration

**Inputs:** 1 | **Outputs:** 1

---

#### dx-toggle-panel
**Purpose:** Collapsible panel  
**Selector:** `<dx-toggle-panel>`  
**Key Features:**
- Expand/collapse content
- Animation effects
- Custom headers

**Inputs:** 2 | **Outputs:** 0

---

#### dx-icon-selection-popup
**Purpose:** Icon selector popup  
**Selector:** `<dx-icon-selection-popup>`  
**Key Features:**
- Icon library display
- Search icons
- Selection handling

**Inputs:** 1 | **Outputs:** 0

---

#### dx-upload
**Purpose:** File upload  
**Selector:** `[dx-upload-btn]`  
**Key Features:**
- File selection
- Drag and drop
- Multiple files
- Preview support
- Progress indicator

**Inputs:** 2 | **Outputs:** 0

---

#### dx-upload-file-popup
**Purpose:** File upload popup  
**Selector:** `<dx-upload-file-popup>`  
**Key Features:**
- Modal file upload
- File list display
- Progress tracking

**Inputs:** 0 | **Outputs:** 0

---

#### dx-file-upload
**Purpose:** File upload component  
**Key Features:**
- Simple and multiple file upload
- Drag and drop zone
- File list with progress
- File type restrictions
- Size limitations
- Preview support

---

#### dx-image-upload
**Purpose:** Image upload  
**Key Features:**
- Image file upload
- Image preview
- Crop functionality
- Multiple images
- Drag and drop

---

#### image-preview
**Purpose:** Image preview  
**Selector:** `<d-image-preview>`  
**Key Features:**
- Image gallery
- Zoom and pan
- Navigation between images

**Inputs:** 1 | **Outputs:** 0

---

#### dx-color-picker
**Purpose:** Color picker  
**Selector:** `<dx-colors>`  
**Key Features:**
- Color palette
- Hex/RGB input
- Recent colors
- Custom colors

**Inputs:** 0 | **Outputs:** 0

---

#### dx-lookup
**Purpose:** Lookup modal  
**Selector:** `<dx-lookup>`  
**Key Features:**
- Modal-based selection interface
- Search functionality
- Single and multi-select modes
- Table display with columns
- Pagination support
- Read-only and view-only modes
- Disabled state support
- Custom templates

**Inputs:** 12 | **Outputs:** 2

---

#### dx-multi-lookup
**Purpose:** Multiple item lookup  
**Selector:** `<dx-multi-lookup>`  
**Key Features:**
- Multi-selection lookup
- Search and filter
- Selected items display
- Table view
- Pagination

**Inputs:** 12 | **Outputs:** 1

---

#### dx-server-side-autocomplete
**Purpose:** Server-side autocomplete  
**Selector:** `<dx-server-side-autocomplete>`  
**Key Features:**
- Async data loading
- Search with debounce
- Pagination support
- Template customization
- Loading indicator

**Inputs:** 22 | **Outputs:** 0

---

#### dx-advance-filter
**Purpose:** Advanced filtering  
**Selector:** `<dx-advance-filter>`  
**Key Features:**
- Multiple filter criteria
- Operator selection
- Add/remove filters
- Group filters
- Apply/clear actions

**Inputs:** 3 | **Outputs:** 1

---

#### dx-criteria-filter
**Purpose:** Criteria-based filtering  
**Key Features:**
- Complex filter criteria
- Nested conditions
- Save filter presets

---

#### dx-table-filter
**Purpose:** Table column filtering  
**Selector:** `<dx-table-filter>`  
**Key Features:**
- Per-column filters
- Filter types (text, number, date)
- Filter operators

**Inputs:** 0 | **Outputs:** 0

---

#### dx-section-title
**Purpose:** Section title  
**Selector:** `<dx-section-title>`  
**Key Features:**
- Section headers
- Icon support
- Action buttons
- Collapsible sections

**Inputs:** 5 | **Outputs:** 2

---

#### dx-title
**Purpose:** Title component  
**Selector:** `<dx-title>`  
**Key Features:**
- Page/section titles
- Custom styling
- Icon support

**Inputs:** 2 | **Outputs:** 0

---

#### dx-timeline
**Purpose:** Timeline display  
**Key Features:**
- Event timeline
- Chronological display
- Custom event templates
- Activity timeline variant
- Calendar timeline variant

---

#### dx-widget
**Purpose:** Dashboard widget  
**Key Features:**
- Widget container
- Header/content areas
- Resize support
- Drag and drop

---

#### cascader
**Purpose:** Cascading selector  
**Selector:** `<d-cascader-li>`  
**Key Features:**
- Multi-level selection
- Dynamic loading
- Search support
- Multiple selection mode

**Inputs:** 10 | **Outputs:** 1

---

#### dropdown
**Purpose:** Dropdown directive  
**Selector:** `[dDropDown][appendToBody]`  
**Key Features:**
- Dropdown positioning
- Append to body
- Auto-close

**Inputs:** 3 | **Outputs:** 0

---

#### select
**Purpose:** Basic select  
**Selector:** `<d-select>`  
**Key Features:**
- Standard dropdown
- Multiple selection
- Search/filter
- Custom options
- Templates

**Inputs:** 40 | **Outputs:** 3

---

#### dx-theme-toggle
**Purpose:** Theme switcher  
**Key Features:**
- Light/dark mode toggle
- Custom themes
- Persist preference

---

#### dx-canvas
**Purpose:** Canvas drawing  
**Key Features:**
- Drawing area
- Shapes and tools
- Save/export
- Multiple variants

---

#### dx-qms-core-ui
**Purpose:** QMS specific components  
**Key Features:**
- Evidence upload
- QMS-specific forms
- Workflow components

---

---

## Common Features Across Components

### Form Integration
- **Reactive Forms Support:** All input components support Angular Reactive Forms
- **Template-Driven Forms:** Compatible with template-driven forms
- **Form Validation:** Built-in validation with custom error messages
- **Error State Matching:** Customizable error display logic
- **Dirty/Touched Tracking:** Form state management

### Accessibility (ARIA)
- **ARIA Labels:** Proper labeling for screen readers
- **Keyboard Navigation:** Full keyboard support
- **Focus Management:** Logical focus order
- **Role Attributes:** Semantic HTML with ARIA roles
- **Announcements:** Screen reader announcements for dynamic content

### Styling & Theming
- **Material Design:** Based on Angular Material
- **Custom Themes:** Theme customization support
- **CSS Variables:** Dynamic styling with CSS custom properties
- **Responsive Design:** Mobile-first responsive layouts
- **Dark Mode:** Dark theme support

### Internationalization (i18n)
- **Transloco Integration:** Built-in i18n support
- **RTL Support:** Right-to-left language support
- **Date/Number Formatting:** Locale-aware formatting
- **Custom Labels:** Customizable text labels

### Performance
- **Change Detection:** OnPush strategy where applicable
- **Virtual Scrolling:** For large lists
- **Lazy Loading:** Load content on-demand
- **Memoization:** Optimized rendering
- **Tree Shaking:** Minimal bundle size

### Developer Experience
- **TypeScript:** Full type safety
- **Generics Support:** Type-safe data handling
- **Documentation:** Comprehensive API docs
- **Examples:** Usage examples for all components
- **IDE Support:** IntelliSense and auto-completion

---

## Integration Guide

### Installation
```bash
npm install ng-dijta
```

### Module Import
```typescript
import { NgDijtaModule } from 'ng-dijta';

@NgModule({
  imports: [
    NgDijtaModule
  ]
})
export class AppModule { }
```

### Component Usage
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <dx-input
      [formControl]="nameControl"
      [outline]="'floating'"
      placeholder="Enter your name">
    </dx-input>
  `
})
export class ExampleComponent {
  nameControl = new FormControl('');
}
```

### Styling
```scss
@import 'ng-dijta/themes/default-theme';

// Custom theme
$custom-theme: (
  primary: #3f51b5,
  accent: #ff4081,
  warn: #f44336
);

@include ng-dijta-theme($custom-theme);
```

---

## Component Documentation

Each component has its own README.md file in its directory with:
- Detailed API reference
- Usage examples
- Feature descriptions
- Input/Output documentation
- Best practices

**Location:** `projects/ng-dijta/src/lib/components/[component-name]/README.md`

---

## Support & Contributing

For issues, feature requests, or contributions, please refer to the main project repository.

---

**Last Updated:** 2026-01-12  
**Library Version:** Latest  
**Documentation Version:** 1.0
