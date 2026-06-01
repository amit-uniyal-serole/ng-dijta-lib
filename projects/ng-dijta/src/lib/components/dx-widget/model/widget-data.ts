export interface WidgetModel {
    title?: string;
    icon?: string;
    action?: WidgetListingActionModel[];
}

export interface WidgetListingActionModel{
    label?:string;
    type?:string;
}