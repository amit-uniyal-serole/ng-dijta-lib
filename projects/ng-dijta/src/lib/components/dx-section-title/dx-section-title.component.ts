import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxSectionButtonConfig } from './dx-section-title.model';

@Component({
  selector: 'dx-section-title',
  templateUrl: './dx-section-title.component.html',
  styleUrls: ['./dx-section-title.component.scss']
})
export class DxSectionTitleComponent  {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() fill: boolean = false;
  @Input() showBtns: boolean = false;
  @Input() buttonConfig!: DxSectionButtonConfig;
  @Output() onClickBtn: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickSaveBtn: EventEmitter<unknown> = new EventEmitter<unknown>();
  public onClickAction(event: string): void {
    this.onClickBtn.emit(event);
  }

  btnClr(): {
    background: string | undefined;
  } {
    return { background: this.buttonConfig?.color };
  }

  onSave(): void {
    this.onClickSaveBtn.emit();
  }
}
