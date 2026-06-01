import { DxPermission } from "./ui-permission";

export interface KeyValueGroup {
  label?: string;
  options?: KeyValueModel[]
}
export interface KeyValueModel {
  keyTt: string | number | boolean;
  valueTt: string;
  subtitle?: string;
  color?: string;
  data?: any;
  disabled?: boolean;
  permission?: DxPermission;
  popupTitle?: string;
  popupDesc?: string[];
}