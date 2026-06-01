import { DisplayPopoverConfig } from "../../dx-card";

export interface ActivityTimeLine {
    label?: string;
    date?: Date | string;
    timelines?: TimelineItem[];
}

export interface TimelineItem {
    owner?: string
    displayDate?: string
    toolTipDate?: string
    displayContent?: string
    displayName?: string
    module?: string
    displayTime?: string
    action?: string
    subject?: string
    iconClass?: string;
    ownerPopoverConfig?: DisplayPopoverConfig;
}