export interface TimelineDetailsView {
    date?: string | Date;
    section?: TimelineDetailsViewSection[]
}

export interface TimelineDetailsViewSection {
    date?: string | Date;
    title: string;
    iconName?: string;
    imageSrc?: string;
    description?: string;
    iconClr?: string;
    content?: string;
    tagColor?: string;
    tagName?: string;
    tagTextColor?: string;
}