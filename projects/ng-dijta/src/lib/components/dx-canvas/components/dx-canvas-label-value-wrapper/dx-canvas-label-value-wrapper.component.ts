import { Component, Input, OnInit } from '@angular/core';
import { DxCanvasContent, IconColor } from '../../model/dx-canvas-interface';

@Component({
  selector: 'dx-canvas-label-value-wrapper',
  templateUrl: './dx-canvas-label-value-wrapper.component.html',
  styleUrls: ['./dx-canvas-label-value-wrapper.component.scss']
})
export class DxCanvasLabelValueWrapperComponent implements OnInit {
  @Input() content!: DxCanvasContent;
  @Input() canvasViewType!: string;
  @Input() columnOrientation: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() hideSeparator: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  setColor(color: string): IconColor {
    const clr: IconColor = {
      color: color ?? '#000000'
    }
    return clr
  }
}
