import { DxChartOption } from "../interfaces/chart.interface";
import { LineChart } from "../interfaces/line-chart.interface";
import { unionBy } from "lodash";
interface LinerChart {
    name?: string;
    type?: string;
    stack?: string
    areaStyle?: {},
    emphasis?: {
        focus: 'series'
    },
    data?: number[]
}

export class LineChartTransform {
    static transform(src: LineChart[]): DxChartOption {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                data: LineChartTransform.collectAllCategory(src)
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: LineChartTransform.collectAllLabels(src)
            },
            yAxis: {
                type: 'value'
            },
            series: LineChartTransform.collectAllSeries(src) as any
        };
    }

    static collectAllLabels(src: LineChart[]): string[] {
        return unionBy(src.filter((val: LineChart) => !!val.label).map((val: LineChart) => val.label ?? ''))
    }
    static collectAllCategory(src: LineChart[]): string[] {
        return unionBy(src.filter((val: LineChart) => !!val.category).map((val: LineChart) => val.category ?? ''))
    }

    static collectAllSeries(src: LineChart[]): LinerChart[] {
        return LineChartTransform.collectAllCategory(src).map((val: string) => {
            return {
                name: val,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: LineChartTransform.prepareDataByLabel(src, val)
            }
        }) ?? []
    }
    // LineChartTransform.collectAllDataByCategory(src, val)
    static collectAllDataByCategory(src: LineChart[], category: string): LineChart[] {
        return src.filter((val: LineChart) => val.category === category)
    }

    static prepareDataByLabel(src: LineChart[], category: string): number[] {
        return LineChartTransform.collectAllLabels(src).map((val: string) => {
            const linerData = LineChartTransform.collectAllDataByCategory(src, category).find((data: LineChart) => data.label === val)
            if (linerData) {
                return linerData.value ?? 0
            }
            return 0
        }) ?? []
    }

}