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
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .max-card-title-width {
        max-width: 20rem;
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
