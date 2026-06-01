import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DxChartOption } from '../../../dx-chart/interfaces/chart.interface';
import { LineChartTransform } from '../../../dx-chart/transform/line-chart.transform';
import { KPI, KpiDto } from '../../interface/kpi';
import { filter, first } from 'rxjs/operators';
import { LineChart } from '../../../dx-chart/interfaces/line-chart.interface';
import { BarChartTransform } from '../../../dx-chart/transform/bar-chart.transform';
import { PieChartTransform } from '../../../dx-chart/transform/pie-chart.transform';
@Component({
  selector: 'dx-kpi-tile',
  templateUrl: './kpi-tile.component.html',
  styleUrls: ['./kpi-tile.component.scss']
})
export class KpiTileComponent implements OnInit {
  @Input() tileData: KPI | undefined;
  height: number | undefined;
  width: number | undefined;
  id: string = crypto.randomUUID();
  chart: DxChartOption | undefined;
  details: KpiDto | undefined;
  constructor(
    private readonly elementRef: ElementRef<HTMLDivElement>,
    private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
    this.element();

  }

  element(): void {
    let elm: HTMLElement = this.elementRef.nativeElement;
    while (!!elm && !elm.offsetHeight) {
      elm = elm.parentElement!;
    }
    this.height = elm.offsetHeight - 100;
    this.width = elm.offsetWidth - 100;
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.height = entry.contentRect.height - 50;
        this.width = (50 / 100) * entry.contentRect.width
      });
    });
    observer.observe(elm.parentElement as Element);
  }

  getData(): void {
    if (this.tileData?.serviceApi) {
      this.http.get(this.tileData?.serviceApi).pipe(
        filter((val: KpiDto | undefined) => !!val),
        first()
      ).subscribe((val: KpiDto | undefined) => {
        this.details = val;
        if (this.details?.chartData && this.details?.chartType) {
          this.getChart(this.details?.chartData, this.details?.chartType)
        }
      });
    }
  }
  getChart(tileData: LineChart[], type: 'liner' | string): void {
    if (type === 'liner') {
      this.chart = LineChartTransform.transform(tileData)
    }
    if (type === 'bar') {
      this.chart = BarChartTransform.transform(tileData)
    }
    if (type === 'pie') {
      this.chart = PieChartTransform.transform(tileData)
    }
  }

}
