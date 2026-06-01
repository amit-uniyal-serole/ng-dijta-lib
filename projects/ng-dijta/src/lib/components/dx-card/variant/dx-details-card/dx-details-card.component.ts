import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgDxCardShowHideCondition } from '../../../../interface/custom-validator';
import { DxCardData, DxDetailsCard, DxDetailsCardContent } from '../../model/dx-details-card.model';
type CardConditionValue = { [key: string]: any }
@Component({
  selector: 'dx-details-card',
  templateUrl: './dx-details-card.component.html',
  styleUrls: ['./dx-details-card.component.scss'],
})
export class DxDetailsCardComponent implements OnChanges {
  @Input() data!: DxDetailsCard;
  @Input() isBorder: boolean = false;
  @Input() position: 'left' | 'top' = 'top';
  @Input() borderButtom: boolean = false;
  @Output() onPopoverAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() showHideCondition: NgDxCardShowHideCondition | undefined;
  values!: CardConditionValue | undefined;
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.previousValue != changes['data']?.currentValue) {
      this.values = changes['data']?.currentValue?.cards?.reduce((outerObj: CardConditionValue, card: DxCardData) => {
        outerObj = card?.content?.reduce((innerObj: CardConditionValue, content: DxDetailsCardContent) => {
          innerObj[content?.fieldName!] = content?.value;
          return { ...outerObj, ...innerObj }
        }, {}) as CardConditionValue;
        return outerObj;
      }, {})
    }
  }

  sendDetailData(content: any) {
    this.onPopoverAction.emit(content);
  }
}
