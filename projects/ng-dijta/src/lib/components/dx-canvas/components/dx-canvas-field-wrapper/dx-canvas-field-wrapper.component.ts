import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dx-canvas-field-wrapper',
  templateUrl: './dx-canvas-field-wrapper.component.html',
  styleUrls: ['./dx-canvas-field-wrapper.component.scss']
})
export class DxCanvasFieldWrapperComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
