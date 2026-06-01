import { Component, Input } from '@angular/core';

@Component({
  selector: 'dx-title',
  templateUrl: './dx-title.component.html',
  styleUrls: ['./dx-title.component.scss'],
})
export class DxTitleComponent {
  @Input() title!: string;
  @Input() icon!: string;
}
