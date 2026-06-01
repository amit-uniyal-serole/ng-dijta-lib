export type TABLE_VIEW_TYPES = 'dx-table' | 'dx-canvas'
export interface MultiViewTable {
    selectedView: TABLE_VIEW_TYPES;
    isMultiViewToggle?: boolean
}