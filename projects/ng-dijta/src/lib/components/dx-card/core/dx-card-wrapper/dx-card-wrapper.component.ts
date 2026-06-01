import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxCardConfig } from '../../model/dx-card.model';

@Component({
  selector: 'dx-card-wrapper',
  templateUrl: './dx-card-wrapper.component.html',
})
export class DxCardWrapperComponent<T> {
  @Input() config!: DxCardConfig;
  @Output()
  public onImageUpload: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickCardAction: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() data: T | undefined;
  @Input() isAdditionalContent: boolean = false;
  onCardAction(event: string): void {
    this.onClickCardAction.emit(event);
  }

  emitFileDetails(event: any) {
    this.onImageUpload.emit(event)
  }
}
