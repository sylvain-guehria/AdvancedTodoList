export interface Drawer {
  index?: number,
  open: boolean,
  key: string
}

export interface Detail {
  key?: string;
  label?: string;
  isdone?: boolean;
}

export interface Message {
  key?: string;
  username?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  date?: string;
  read?: boolean;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
