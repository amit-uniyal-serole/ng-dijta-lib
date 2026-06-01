# dx-autocomplete-select sample data

Drop-in examples you can copy into a host component to demo `dx-autocomplete-select`.

### Sample options

```ts
export const countries: KeyValueModel[] = [
  { key: 'us', valueTt: 'United States' },
  { key: 'ca', valueTt: 'Canada' },
  { key: 'mx', valueTt: 'Mexico' }
];
```

### Sample createOption

```ts
export const createOption: CreateOption = {
  label: 'Create new entry',
  isShow: true
};
```

### Example emitted values

- `onautoCompleteSelect` will emit the typed string (e.g. `'Uni'`) while typing.
- `onUserChange` or `onSelectChange` will emit the selected `key` or an array of keys when `multiple` is enabled.
