import { Component, Input } from '@angular/core';

@Component({
  selector: 'dx-content',
  templateUrl: './dx-content.component.html',
  styleUrls: ['./dx-content.component.scss'],
})
export class DxContentComponent {
  @Input() content!: string;
}
