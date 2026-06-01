export type SORT_TIMELINE_BY='older'|'latest';
export interface TimeLineCalenderBoxModel {
    date?: number;
    month?: string;
    active?: boolean;
    isSameDate?: boolean;
    isParent?: boolean;
}
export interface TimeLineCalenderModel {
    title?: string;
    description?: string;
    box?: TimeLineCalenderBoxModel;
    date?: Date;
}
