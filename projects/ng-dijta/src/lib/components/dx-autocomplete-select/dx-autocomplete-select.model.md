# dx-autocomplete-select models

This file documents small public types used by `dx-autocomplete-select`.

## CreateOption

```ts
export interface CreateOption {
  label?: string; // label for the create action (default: 'Create New Option')
  isShow?: boolean; // whether to show the create option entry
}
```

## KeyValueModel (project core)

`KeyValueModel` is defined in the project core and typically looks like:

```ts
interface KeyValueModel {
  key: string | number;
  valueTt: string; // display text
}
```

## Notes

- Use `CreateOption` to control whether a create-new option should be displayed and what label to show.
- `dx-autocomplete-select` consumes `KeyValueModel[]` for its `options` input.
