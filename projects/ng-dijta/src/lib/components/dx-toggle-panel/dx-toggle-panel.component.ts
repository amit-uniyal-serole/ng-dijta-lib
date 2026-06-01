import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  ToggleAnimationConstant
} from './toggle-animation-constant/toggle-animation-constant';
export type PANEL_TOGGLE = 'open' | 'close';
export type PANEL_DIRECTION = 'right' | 'left';
@Component({
  selector: 'dx-toggle-panel',
  templateUrl: './dx-toggle-panel.component.html',
  styleUrls: ['./dx-toggle-panel.component.scss'],
  animations: ToggleAnimationConstant.getAnimations(),
})
export class DxTogglePanelComponent implements OnInit, OnChanges {
  @Input() panelToggle!: PANEL_TOGGLE;
  @Input() direction!:PANEL_DIRECTION;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.panelToggle?.previousValue != changes?.panelToggle?.currentValue
    ) {
      this.panelToggle = this.panelToggle;
    }
  }
}
