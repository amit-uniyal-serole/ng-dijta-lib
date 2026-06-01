import { Component, Input, OnInit } from '@angular/core';
import { CardDescription } from '../../model/dx-card.model';
interface BgClass {
  color?: string;
  opacity?: string;
  fontWeight?: string;
  ['background-color']?: string;
}
@Component({
  selector: 'dx-card-description',
  templateUrl: './dx-card-description.component.html',
  styles: [
    `
      .card-title {
        max-width: 20rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ]
})
export class DxCardDescriptionComponent implements OnInit {
@Input() description!:CardDescription;
  constructor() { }

  ngOnInit(): void {
  }
  showBackgroundColor(color: string): BgClass | undefined {
    const clr: string = color ?? '#27AE60';
    if (clr) {
      let ngclass: BgClass = {
        color: '#fff',        
        fontWeight: 'bold',
        'background-color': `${clr}`,
      };
      return ngclass;
    } else {
      return undefined;
    }
  }
}
