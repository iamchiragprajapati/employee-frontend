export interface ActionToolbar {
  label: string;
  callback: (rowReference: any) => void;
}

export interface SvgIcon {
  name: string;
  path: string;
}