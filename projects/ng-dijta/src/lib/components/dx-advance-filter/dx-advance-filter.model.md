# dx-advance-filter models

This file documents the public data shapes used by `dx-advance-filter` and its helper sub-component(s).

## FilterData

```ts
interface FilterData {
  columns: Columns[];
}

interface Columns {
  keyTt: string;   // internal key used in the filter value
  valueTt: string; // display text shown to users
  conditions: Conditions[]; // available conditions for this column
}

interface Conditions {
  keyTt: string;   // condition id (eg 'eq', 'contains')
  valueTt: string; // display label for condition
}
```

## FilterButtons

```ts
interface FilterButtons {
  primaryBtn: BtnSettings;
  secondaryBtn: BtnSettings;
}

interface BtnSettings {
  show: boolean;
  title: string;
}
```

## OnClickAddNewButton (emitted by `dx-filter-add-button`)

```ts
interface OnClickAddNewButton {
  actionType: string | number;
  isAddNew: boolean;
}
```

## DxAdvanceFilterModel (helper)

```ts
interface DxAdvanceFilterModel {
  column: KeyValueModel[];
  conditions: KeyValueModel[];
}
```

Notes
- `KeyValueModel` comes from the library core and is typically `{ key: string | number, value: string }`.
- Use these types when constructing `filterData` and wiring up handlers for `onClickAction` events.
