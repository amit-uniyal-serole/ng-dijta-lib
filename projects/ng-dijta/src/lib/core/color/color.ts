import { DxSafeAny } from "../outlet/type/any";

export const statusColors = ['success', 'processing', 'error', 'default', 'warning'] as const;

export const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
] as const;

export type DxPresetColor = typeof presetColors[number];
export type DxStatusColor = typeof statusColors[number];

export function isPresetColor(color: string): color is DxPresetColor {
  return presetColors.indexOf(color as DxSafeAny) !== -1;
}

export function isStatusColor(color: string): color is DxPresetColor {
  return statusColors.indexOf(color as DxSafeAny) !== -1;
}
