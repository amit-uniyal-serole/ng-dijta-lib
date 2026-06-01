## Selector

> <dx-tree-v2 [nodes]="nodes" [options]="options" [showLine]="showLine" (onFocus)="onFocus($event)"></dx-tree-v2>

## Inputs

| Input                      | Data need to be passed as input |
| -------------------------- | ------------------------------- |
| **nodes** (ITreeNode)      | `Tree Data`                     |
| **options** (ITreeOptions) | `Tree options `                 |
| **showLine** (boolean)     | `show branch lines in tree`     |

## Events

| Event                  | Time of triggering       | return type        |
| ---------------------- | ------------------------ | ------------------ |
| **onSelectChange**     | `on selection of option` | **OnSelectChange** |
| **onToggleExpanded**   | `on toggle`              | **TreeEvent**      |
| **onActivate**         | `on click label `        | **TreeEvent**      |
| **onDeactivate**       | `on click label `        | **TreeEvent**      |
| **onNodeActivate**     | `- `                     | **TreeEvent**      |
| **onNodeDeactivate**   | `- `                     | **TreeEvent**      |
| **onSelect**           | `- `                     | **TreeEvent**      |
| **onDeselect**         | `- `                     | **TreeEvent**      |
| **onFocus**            | `on focus `              | **TreeEvent**      |
| **onBlur**             | `on blur `               | **TreeEvent**      |
| **onUpdateData**       | `- `                     | **TreeEvent**      |
| **onInitialized**      | `on initialize `         | **TreeEvent**      |
| **onMoveNode**         | `- `                     | **TreeEvent**      |
| **onCopyNode**         | `- `                     | **TreeEvent**      |
| **onLoadNodeChildren** | `- `                     | **TreeEvent**      |
| **onChangeFilter**     | `- `                     | **TreeEvent**      |
| **onEvent**            | `- `                     | **TreeEvent**      |
| **onStateChange**      | `- `                     | **TreeEvent**      |

## Material Icons

`<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round&display=block" rel="stylesheet" />`

## Sample Data

```

nodes: any[] = [
    {

      label: 'Home',
      isExpanded: true,
      icon: 'home',
      hideExpansionIcon: true,
      classes: 'root-margin',
      children: [
        {
          label: 'Packages',
          icon: 'inventory_2',
          children: [
            {
              label: 'Youth Allowance',
              iconColor: '#5e7892',
              children: [
                {
                  label: 'Version 1',
                  icon: 'burst_mode',
                  iconColor: '#23a3d0',
                  children: [{
                    label: 'Rule Flow',
                    iconColor: '#2BC3A8'
                  },
                  {
                    label: 'Rules',
                    iconColor: '#F7B673'
                  },
                  {
                    label: 'Data Structure',
                    iconColor: '#EB5C5C'
                  },]
                },
                {
                  label: 'Version 2',
                  icon: 'burst_mode',
                  iconColor: '#23a3d0',
                  children: [{
                    label: 'Rule Flow',
                    iconColor: '#2BC3A8'
                  },
                  {
                    label: 'Rules',
                    iconColor: '#F7B673'
                  },
                  {
                    label: 'Data Structure',
                    iconColor: '#EB5C5C'
                  },]

                },
              ]
            },


            {
              label: 'Test'
            }
          ]
        },
        {
          label: 'Rule Flow',

        },
        {
          label: 'Rules',

        },
        {
          label: 'Data Structure',

        },
      ]
    },

];

```
