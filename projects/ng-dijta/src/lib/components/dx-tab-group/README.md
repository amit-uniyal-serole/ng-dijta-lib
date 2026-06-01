## Selector for dx-tab-view

`<dx-tab-view></dx-tab-view>`

## Module

`DxTabGroupModule`

## Usage inside form

```
<dx-tab-group>
  <dx-tab>
    <dx-tab-header title="Title"></dx-tab-header>
    <dx-tab-content>
      <div>Some more content</div>
    </dx-tab-content>
  </dx-tab>
</dx-tab-group>

```

## Inputs

| Input                          | Data need to be passed as input | Default               |
| ------------------------------ | ------------------------------- | --------------------- | -------------------- | ------- |
| **tabsAlign** ( 'start'        | 'center'                        | 'end' )               | `pass Tab Alignment` | 'start' |
| **outline** ('filled'          | 'top_underline'                 | 'none')               | `pass Tab View`      | 'none'  |
| **animationDuration** (string) | `pass tab animation duration`   | '0ms'                 |
| **headerPosition** ('below'    | '')                             | `Change Tab position` | ''                   |
| **color** (string)             | `tab color`                     | ''                    |
| **backgroundColor** (string)   | `tab background color`          | ''                    |
| **selectedIndex** (number)     | `active tab index`              | 0                     |

## Events

| Event                  | Time of triggering    | return type              |
| ---------------------- | --------------------- | ------------------------ |
| **selectFocusedIndex** | `on selection of tab` | **EventEmitter<number>** |
