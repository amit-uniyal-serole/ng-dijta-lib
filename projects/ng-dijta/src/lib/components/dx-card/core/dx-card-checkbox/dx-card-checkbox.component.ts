import { Component, Input, OnInit } from '@angular/core';
import { DxDetailsCardContent } from '../../model/dx-details-card.model';


@Component({
  selector: 'dx-card-checkbox',
  templateUrl: './dx-card-checkbox.component.html',
})
export class DxCardCheckboxComponent {
  @Input() data!: DxDetailsCardContent
}
