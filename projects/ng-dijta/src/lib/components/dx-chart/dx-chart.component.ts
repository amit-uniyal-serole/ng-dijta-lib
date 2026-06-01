import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import * as echarts from 'echarts';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SubscriptionUtil } from '../../utils/subscription/subscription.util';

@Component({
  selector: 'dx-chart',
  template: ''
})
export class DxChartComponent<T> implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartData!: echarts.EChartsOption;
  @Output() readonly chartClicked: EventEmitter<echarts.EChartsOption> = new EventEmitter<echarts.EChartsOption>();
  @Input() chartParentId: string | undefined;

  private echart!: echarts.ECharts;
  private resizeSub!: Subscription;

  constructor(private readonly elementRef: ElementRef<HTMLDivElement>) {
  }

  ngAfterViewInit(): void {
    this.setupChart();
    this.parentDivResize();
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(50))
      .subscribe(() => {
        this.onResize();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
    this.onResize();
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.resizeSub);
    this.destroyChart();
  }

  onResize(): void {
    if (!!this.echart) {
      this.echart.resize(this.getContainerSize());
    }
  }

  onChartClick(params: echarts.EChartsOption): void {
    this.chartClicked.emit(params);
  }

  private parentDivResize(): void {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.echart.resize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      });
    });
    if (this.chartParentId && document.querySelector(`[id='${this.chartParentId}']`)) {
      observer.observe(document.querySelector(`[id='${this.chartParentId}']`) as Element);
    }

  }

  private destroyChart(): void {
    if (!!this.echart) {
      this.echart.dispose();
      this.echart = undefined!;
    }
  }

  private setupChart(): void {
    this.echart = echarts.init(
      this.elementRef.nativeElement,
      undefined,
      this.getContainerSize()
    );

    this.echart.on('click', this.onChartClick.bind(this));
    this.updateChart();
  }

  private updateChart(): void {
    if (!!this.echart && !!this.chartData) {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.echart.setOption(this.chartData);
    }
  }

  private getContainerSize(): any {
    const result = {
      height: 100,
      width: 100,
      renderer: 'svg'
    };

    // Find parent element with a size
    let elm: HTMLElement = this.elementRef.nativeElement;
    while (!!elm && !elm.offsetHeight) {
      elm = elm.parentElement!;
    }

    if (!!elm) {
      result.height = Math.max(100, elm.offsetHeight);
      result.width = Math.max(100, elm.offsetWidth);
    }

    return result;
  }
}
