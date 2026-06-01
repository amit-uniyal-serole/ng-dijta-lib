import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonActionTransform } from '../../../../utils/transform/button-actions.transform';
import { MultiActionButtonSettings } from '../../../dx-table/interfaces/dx-table.interface';
@Component({
  selector: 'dx-card-action',
  templateUrl: './dx-card-action.component.html',
})
export class DxCardActionComponent<T> implements OnChanges {

  @Input() actions: MultiActionButtonSettings | undefined;
  @Output() onClickCardAction: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() data: T | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actions'].currentValue !== changes['actions'].previousValue || changes['data'].currentValue !== changes['data'].previousValue) {
      this.actions = ButtonActionTransform.updateActionSettings(this.actions!, this.data)
    }
  }

  onEvent(event: string): void {
    this.onClickCardAction.emit(event);
  }
}
