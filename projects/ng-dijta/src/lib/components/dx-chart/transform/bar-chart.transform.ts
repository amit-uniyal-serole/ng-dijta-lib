import { DxChartOption } from "../interfaces/chart.interface";
import { LineChart } from "../interfaces/line-chart.interface";
import { unionBy } from "lodash";
interface BarChart {
    name?: string;
    type?: string;
    stack?: string
    data?: number[]
}

export class BarChartTransform {
    static transform(src: LineChart[]): DxChartOption {
        return {

            legend: {
                data: BarChartTransform.collectAllCategory(src)
            },

            xAxis: {
                type: 'category',
                data: BarChartTransform.collectAllLabels(src)
            },
            yAxis: {
                type: 'value'
            },
            series: BarChartTransform.collectAllSeries(src) as any
        };
    }

    static collectAllLabels(src: LineChart[]): string[] {
        return unionBy(src.filter((val: LineChart) => !!val.label).map((val: LineChart) => val.label ?? ''))
    }
    static collectAllCategory(src: LineChart[]): string[] {
        return unionBy(src.filter((val: LineChart) => !!val.category).map((val: LineChart) => val.category ?? ''))
    }

    static collectAllSeries(src: LineChart[]): BarChart[] {
        return BarChartTransform.collectAllCategory(src).map((val: string) => {
            return {
                name: val,
                type: 'bar',

                data: BarChartTransform.prepareDataByLabel(src, val)
            }
        }) ?? []
    }
    // BarChartTransform.collectAllDataByCategory(src, val)
    static collectAllDataByCategory(src: LineChart[], category: string): LineChart[] {
        return src.filter((val: LineChart) => val.category === category)
    }

    static prepareDataByLabel(src: LineChart[], category: string): number[] {
        return BarChartTransform.collectAllLabels(src).map((val: string) => {
            const linerData = BarChartTransform.collectAllDataByCategory(src, category).find((data: LineChart) => data.label === val)
            if (linerData) {
                return linerData.value ?? 0
            }
            return 0
        }) ?? []
    }

}