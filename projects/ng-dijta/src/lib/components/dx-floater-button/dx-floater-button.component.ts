import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonAction } from './button.model';

@Component({
  selector: 'dx-floater-button',
  templateUrl: './dx-floater-button.component.html',
  styleUrls: ['./dx-floater-button.component.scss']
})
export class DxFloaterButtonComponent {
  @Input() bottomBarActions!: Array<ButtonAction>;
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  submit(action: ButtonAction): void {
    this.onSubmit.emit(action?.event);
  }

}
