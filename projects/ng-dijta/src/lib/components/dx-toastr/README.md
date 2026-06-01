## Import Module

> `import {DxToastrModule} from @ngdx/dijta`

## Usage

`import {ToastrService} from @ngdx/dijta`

example:

> constructor(public toastr: ToastrService) {

    this.tsTOptions = this.toastr.toastrConfig;

}

`
ToastrConfig: ToastrConfigModel = {

      message: 'Changes Saved successfully Changes ',
      title: "Success",
      options: this.tsTOptions,
      type: 'success'

    }

this.toastr.showToastr(ToastrConfig)

`

## Options

There are **individual options** and **global options**.

### Individual Options

| Option            | Type                                        | Default           | Description                                                                                                                                     |
| ----------------- | ------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| toastComponent    | Component                                   | Toast             | Angular component that will be used                                                                                                             |
| closeButton       | boolean                                     | false             | Show close button                                                                                                                               |
| timeOut           | number                                      | 5000              | Time to live in milliseconds                                                                                                                    |
| extendedTimeOut   | number                                      | 1000              | Time to close after a user hovers over toast                                                                                                    |
| disableTimeOut    | `boolean \| 'timeOut' \| 'extendedTimeOut'` | false             | Disable both timeOut and extendedTimeOut when set to `true`. Allows specifying which timeOut to disable, either: `timeOut` or `extendedTimeOut` |
| easing            | string                                      | 'ease-in'         | Toast component easing                                                                                                                          |
| easeTime          | string \| number                            | 300               | Time spent easing                                                                                                                               |
| enableHtml        | boolean                                     | false             | Allow html in message                                                                                                                           |
| progressBar       | boolean                                     | false             | Show progress bar                                                                                                                               |
| progressAnimation | `'decreasing' \| 'increasing'`              | 'decreasing'      | Changes the animation of the progress bar.                                                                                                      |
| toastClass        | string                                      | 'ngx-toastr'      | Class on toast                                                                                                                                  |
| positionClass     | string                                      | 'toast-top-right' | Class on toast container                                                                                                                        |
| titleClass        | string                                      | 'toast-title'     | Class inside toast on title                                                                                                                     |
| messageClass      | string                                      | 'toast-message'   | Class inside toast on message                                                                                                                   |
| tapToDismiss      | boolean                                     | true              | Close on click                                                                                                                                  |
| onActivateTick    | boolean                                     | false             | Fires `changeDetectorRef.detectChanges()` when activated. Helps show toast from asynchronous events outside of Angular's change detection       |

### Global Options

All [individual options](#individual-options) can be overridden in the global
options to affect all toasts. In addition, global options include the following
options:

| Option                  | Type    | Default                            | Description                                                                                                   |
| ----------------------- | ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| maxOpened               | number  | 0                                  | Max toasts opened. Toasts will be queued. 0 is unlimited                                                      |
| autoDismiss             | boolean | false                              | Dismiss current toast when max is reached                                                                     |
| iconClasses             | object  | [see below](#iconclasses-defaults) | Classes used on toastr service methods                                                                        |
| newestOnTop             | boolean | true                               | New toast placement                                                                                           |
| preventDuplicates       | boolean | false                              | Block duplicate messages                                                                                      |
| countDuplicates         | boolean | false                              | Displays a duplicates counter (preventDuplicates must be true). Toast must have a title and duplicate message |
| resetTimeoutOnDuplicate | boolean | false                              | Reset toast timeout on duplicate (preventDuplicates must be true)                                             |
| includeTitleDuplicates  | boolean | false                              | Include the title of a toast when checking for duplicates (by default only message is compared)               |
