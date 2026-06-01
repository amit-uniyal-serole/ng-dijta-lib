import {
    Component,
    EventEmitter,
    Input,
    OnChanges, Output,
    SimpleChanges
} from '@angular/core';
import { SlideToggleSettings } from '../../interfaces/dx-additional.interface';

@Component({
  selector: 'dx-table-slide-toggle',
  templateUrl: './dx-table-slide-toggle.component.html',
  styleUrls: ['./dx-table-slide-toggle.component.scss'],
})
export class DxTableSlideToggleComponent implements OnChanges {
  @Input() setting!: SlideToggleSettings;
  @Output() onToggleUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.setting?.previousValue != changes?.setting?.currentValue) {
      this.setting = this.setting;
    }
  }
  onChange(event: boolean): void {
    this.onToggleUpdate.emit(event);
  }
}
