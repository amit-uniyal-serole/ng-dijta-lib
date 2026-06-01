import { Component, Input } from '@angular/core';

@Component({
  selector: 'dx-form-card',
  templateUrl: './dx-form-card.component.html',
  styleUrls: ['./dx-form-card.component.scss']
})
export class DxFormCardComponent {
  @Input() title: string | undefined;
  @Input() hideCardStyle: boolean = false;
}
