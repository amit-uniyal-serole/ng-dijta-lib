export interface ContentMenu {
  label: string;
  path?: string;
  id?: string;
  children?: ContentMenu[];
  params?: { [key: string]: string };
  fragment?: string;
}
