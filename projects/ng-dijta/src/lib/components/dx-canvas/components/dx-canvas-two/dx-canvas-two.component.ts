import { Component, Input, OnInit } from '@angular/core';
import { DxCanvasCenterContent } from '../../model/dx-canvas-interface';

@Component({
  selector: 'dx-canvas-two',
  templateUrl: './dx-canvas-two.component.html',
  styleUrls: ['./dx-canvas-two.component.scss']
})
export class DxCanvasTwoComponent implements OnInit {
  @Input() content!: DxCanvasCenterContent;
  @Input() canvasViewType!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
