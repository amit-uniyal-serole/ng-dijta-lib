import { LineChart } from "../../dx-chart/interfaces/line-chart.interface";
import { TileFooterDto } from "./tile-footer";
import { TileHeaderDto } from "./tile-header";

export interface KPI {
    header?: TileHeaderDto;
    serviceApi?: string;
    footer?: TileFooterDto;
}
export interface KpiDto {
    value?: string;
    icon?: string;
    unit?: string;
    color?: string;
    title?: string;
    chartType?: 'liner' | string;
    chartData?: LineChart[];
}
