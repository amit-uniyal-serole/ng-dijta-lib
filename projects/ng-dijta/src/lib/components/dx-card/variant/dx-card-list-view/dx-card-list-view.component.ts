import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DxCardConfig } from '../../model/dx-card.model';

@Component({
  selector: 'dx-card-list-view',
  templateUrl: './dx-card-list-view.component.html',
})
export class DxCardListViewComponent<T> {
  @Input() config!: DxCardConfig;
  @Output()
  public onImageUpload: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickCardAction: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() data: T | undefined;
  @Input() isAdditionalContent: boolean = false;
  onSelectCardAction(event: string): void {
    this.onClickCardAction.emit(event)
  }

  emitFileDetail(event: any) {
    this.onImageUpload.emit(event)
  }
}
