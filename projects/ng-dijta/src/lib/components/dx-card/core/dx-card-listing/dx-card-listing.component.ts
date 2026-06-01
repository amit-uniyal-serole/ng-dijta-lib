import { Component, Input, OnInit } from '@angular/core';
import { CardContentListing } from '../../model/dx-card.model';

@Component({
  selector: 'dx-card-listing',
  templateUrl: './dx-card-listing.component.html',
  styles: [
    `
    .dx-card-wrapper-listing {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
    }
    `
  ]
})
export class DxCardListingComponent implements OnInit {
  @Input() contentListing!: CardContentListing[];
  constructor() { }

  ngOnInit(): void {
  }

}
