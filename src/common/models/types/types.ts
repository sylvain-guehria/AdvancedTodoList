export interface Drawer {
  index?: number,
  open: boolean,
  key: string
}

export interface Detail {
  key?: string;
  label: string;
  isdone: boolean;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
