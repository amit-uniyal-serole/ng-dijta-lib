import { Component, Input, OnInit } from '@angular/core';
import { DxCanvasCenterContent } from '../../model/dx-canvas-interface';

@Component({
  selector: 'dx-canvas-layout-wrapper',
  templateUrl: './dx-canvas-layout-wrapper.component.html',
  styleUrls: ['./dx-canvas-layout-wrapper.component.scss']
})
export class DxCanvasLayoutWrapperComponent implements OnInit {
  @Input() canvasViewType!: string;
  @Input() content!: DxCanvasCenterContent
  constructor() { }

  ngOnInit(): void {
  }

}
