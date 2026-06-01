import { Component, Input } from '@angular/core';
type messageType = 'success' | 'error';
@Component({
  selector: 'dx-alert-message',
  templateUrl: './dx-alert-message.component.html',
  styleUrls: ['./dx-alert-message.component.scss']
})
export class DxAlertMessageComponent {

  @Input() msg!: string;
  @Input() type: messageType = 'error';

}
