import { Component, Inject, Input, Optional } from "@angular/core";
import { UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../../../core/UI/service/input/ui-component.config';

@Component({
    selector: 'dx-card-datetime',
    template: `
        <span *ngIf="value;else noData" dx-tooltip dxTooltipTitle="{{value | dxdate:datetimeFormat}}">{{ value |
      dxdate:datetimeFormat}}</span>
      <ng-template #noData>
        -
    </ng-template>
    `
})
export class DxCardDateTimeComponent {
    datetimeFormat: string = "yyyy-MM-dd"
    @Input() value: string | undefined;
    constructor(
        @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper
    ) {
        this.datetimeFormat = `${config?.value?.dateFormat ?? 'DD-MM-YYYY'} ${config?.value?.timeFormat ?? 'h:mm:ss a'}`;
    }
}