import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DxCardAccordianAction } from '../../model/dx-card.model';
const DEFAULT_DURATION = 300;
@Component({
  selector: 'dx-card-accordian',
  templateUrl: './dx-card-accordian.component.html',
  styleUrls: ['./dx-card-accordian.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state(
        'true',
        style({ height: '0', visibility: 'hidden', padding: '0px' })
      ),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(-90deg)' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-out')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-in')),
    ]),
  ],
})
export class DxCardAccordianComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() collapsed: boolean = false;
  @Input() action!: DxCardAccordianAction;
  @Output() onAction: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['collapsed']?.previousValue !==
      changes['collapsed']?.currentValue
    ) {
      this.collapsed = this.collapsed;
    }
  }
  toggleContent(): void {
    this.collapsed = !this.collapsed;
  }

  onActionClick(event: string): void {
    this.onAction.emit(event);
  }
  applyClr(color: string): {
    color: string;
  } {
    return {
      color: color,
    };
  }
}
