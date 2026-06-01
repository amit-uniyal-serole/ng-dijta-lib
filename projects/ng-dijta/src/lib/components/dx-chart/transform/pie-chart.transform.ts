import { DxChartOption } from "../interfaces/chart.interface";
import { LineChart } from "../interfaces/line-chart.interface";
export interface PieChartDate {
    value: string | number;
    name: string;
}
export class PieChartTransform {
    static transform(src: LineChart[]): DxChartOption {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '1%',
                left: 'center'
            },
            series: [
                {
                    name: 'Information',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: PieChartTransform.prepareDataByLabel(src) as any
                }
            ]
        };
    }
    static prepareDataByLabel(src: LineChart[]): PieChartDate[] {
        return src.map((pie) => {
            return {
                value: pie?.value ?? '',
                name: pie?.label ?? ''
            }
        }) ?? []
    }
}