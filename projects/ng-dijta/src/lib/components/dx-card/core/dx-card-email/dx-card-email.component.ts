import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dx-card-email',
  template: `<a dx-tooltip dxTooltipTitle="{{data  | transloco}}" class="dx-card-email" href="mailto:{{data}}">{{data  | transloco}}</a>`,
  styles: [
    `
    .dx-card-email{
      color:#0d6efdd6
    }
    `
  ]
})
export class DxCardEmailComponent implements OnInit {
  @Input() data!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
