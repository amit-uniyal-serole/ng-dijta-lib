import { Component, Input, OnInit } from '@angular/core';
import { DxCanvasCenterContent } from '../../model/dx-canvas-interface';

@Component({
  selector: 'dx-canvas-three',
  templateUrl: './dx-canvas-three.component.html',
  styleUrls: ['./dx-canvas-three.component.scss']
})
export class DxCanvasThreeComponent implements OnInit {
  @Input() content!: DxCanvasCenterContent;
  @Input() canvasViewType!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
