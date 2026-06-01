export interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  disabled?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  active?: boolean;
  color?: string;
  icon?: string;
  parent?: string;
  pageNo?:number;
  _loading?: boolean;
  [prop: string]: any;
}
