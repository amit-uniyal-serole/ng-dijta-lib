import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dx-card-accordian-content',
  template: `<ng-content></ng-content>`,  
})
export class DxCardAccordianContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
