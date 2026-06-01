import { Component, Inject, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { DateSetting } from '../../interfaces/dx-table.interface';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../../../core/UI/service/input/ui-component.config';
import { DateDefault } from '../../../../core/UI/constant/currency-default';
import { FlexTableCellComponent } from '../../ngx-table/flex-table-cell/flex-table-cell.component';
@Component({
  selector: 'dx-table-date',
  templateUrl: './dx-table-date.component.html',
  styleUrls: ['./dx-table-date.component.css']
})
export class DxTableDateComponent extends FlexTableCellComponent<Date | string> implements OnChanges, OnInit {
  @Input() withTime = false;
  static readonly DEFAULT_TEXT: string = '-';
  @Input() data!: Date | string;

  @Input()
  defaultText: string = DxTableDateComponent.DEFAULT_TEXT;

  @Input()
  setting?: DateSetting;

  constructor(@Optional() @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper) {
    super()
  }


  customTimeFormat: string = ''

  ngOnInit(): void {
    this.customTimeFormat = this.getTimeFormat()
  }

  ngOnChanges(): void {
    this.customTimeFormat = this.getTimeFormat();
    if (this.data) {
      this.data = this.checkZisPersent(this.data);
    }
  }

  private getTimeFormat(): string {
    let dateFormat = DateDefault.DEFAULT_DATE_PICKER_FORMAT;
    let timeFormat = DateDefault.DEFAULT_TIME_PICKER_FORMAT
    if (this.setting?.format) {
      dateFormat = this.setting?.format
    }
    if (this.setting?.timeFormat) {
      timeFormat = this.setting?.timeFormat
    }
    if (this.config?.value?.dateFormat) {
      dateFormat = this.config?.value?.dateFormat
    }
    if (this.config?.value?.timeFormat) {
      timeFormat = this.config?.value?.timeFormat
    }
    return `${dateFormat} ${timeFormat}`
  }

  private checkZisPersent(data: Date | string): Date | string {
    if (typeof data === 'string') {
      const endsWithZ = data.endsWith("Z");
      return endsWithZ ? data : `${data}Z`
    }
    return data;
  }
}
