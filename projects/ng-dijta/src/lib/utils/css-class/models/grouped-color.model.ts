import { NamedColor, PolicyColorHover } from './named-color.model';

export interface GroupedNamedColors {
  [key: string]: Array<NamedColor>;
}
export interface GroupedPolicyNamedColors {
  [key: string]: Array<PolicyColorHover>;
}
