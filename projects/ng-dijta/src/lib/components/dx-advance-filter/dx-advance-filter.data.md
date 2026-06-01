# dx-advance-filter sample data

Copyable examples you can drop into a component to drive `dx-advance-filter` in demos or tests.

### Example `FilterButtons`

```ts
export const filterButtons: FilterButtons = {
  primaryBtn: { show: true, title: 'Apply' },
  secondaryBtn: { show: true, title: 'Reset' }
};
```

### Example `FilterData`

```ts
export const filterData: FilterData = {
  columns: [
    {
      keyTt: 'name',
      valueTt: 'Name',
      conditions: [
        { keyTt: 'contains', valueTt: 'Contains' },
        { keyTt: 'eq', valueTt: 'Equals' }
      ]
    },
    {
      keyTt: 'status',
      valueTt: 'Status',
      conditions: [
        { keyTt: 'eq', valueTt: 'Equals' },
        { keyTt: 'neq', valueTt: 'Not equal' }
      ]
    }
  ]
};
```

### Example: handling the emitted payload

When the user clicks the primary button, the component emits either a simple action string (if the control provided a clickEvent) or the filter form value with the groups/sections structure. Example form value shape:

```ts
{
  groups: [
    {
      id: 1612345678901,
      groupBy: 'name',
      sections: [
        { id: 1612345678902, column: 'name', condition: 'contains', criteria: 'Acme' }
      ]
    }
  ]
}
```
