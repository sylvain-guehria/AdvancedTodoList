export interface SubTask {
  key?: string;
  label: string;
  isdone: boolean;
  order?: number;
  details?: Detail[]
  deadline?: string,
  creationDate?: string,
  numberdaysleft?: boolean,
  importance?: number,
  tags?: string[],
  motherKey?: string
}

export interface Detail {
  label: string;
  isdone: boolean;
}
