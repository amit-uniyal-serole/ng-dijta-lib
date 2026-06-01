## Selector

`<dx-email></dx-email>`

## Module

`DxEmailModule`

## Styles

`@import "../../ng-dijta/src/lib/core/theme/tui/css/css/style";`

## Add paths in angular.json

> Quill editor need below css and script file

```
           "styles": [

              "./node_modules/quill/dist/quill.core.css",
              "./node_modules/quill/dist/quill.bubble.css",
              "./node_modules/quill/dist/quill.snow.css",
              "./node_modules/quill-emoji/dist/quill-emoji.css",

            ],

            "scripts": [
              "./node_modules/quill/dist/quill.min.js"
            ]
```

## Selector after implementing inputs and output

> <dx-email [emailListType]="emailListType" [emailsList]="emailList" (onClickMenu)="onClickMenu($event)"></dx-email>
