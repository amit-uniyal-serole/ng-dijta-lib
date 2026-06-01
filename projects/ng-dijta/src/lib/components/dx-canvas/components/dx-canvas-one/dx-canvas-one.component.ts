import { Component, Input, OnInit } from '@angular/core';
import { DxCanvasCenterContent } from '../../model/dx-canvas-interface';

@Component({
  selector: 'dx-canvas-one',
  templateUrl: './dx-canvas-one.component.html',
  styleUrls: ['./dx-canvas-one.component.scss']
})
export class DxCanvasOneComponent implements OnInit {
  @Input() content!: DxCanvasCenterContent;
  @Input() canvasViewType!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
