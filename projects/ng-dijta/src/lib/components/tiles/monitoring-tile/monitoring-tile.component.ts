import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MonitoringTileDto } from './model/monitoring-tile';

@Component({
  selector: 'dx-monitoring-tile',
  templateUrl: './monitoring-tile.component.html',
  styleUrls: ['./monitoring-tile.component.scss']
})
export class MonitoringTileComponent {
  @ViewChild('content') elementView!: ElementRef;
  contentHeight!: number;
  isSmallContainer: boolean = false;

  @Input() data!: MonitoringTileDto;
  constructor(private cd: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.contentHeight = this.elementView.nativeElement.offsetHeight;
    this.isSmallContainer = this.contentHeight < 200;
    this.cd.detectChanges();
  }
}
