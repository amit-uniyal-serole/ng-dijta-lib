import { Component, Input } from '@angular/core';

@Component({
  selector: 'dx-card',
  templateUrl: './dx-card.component.html',
  styleUrls: ['./dx-card.component.scss']
})
export class DxCardComponent {
  @Input() title: string | undefined;
  @Input() borderNone: boolean = false;
}
