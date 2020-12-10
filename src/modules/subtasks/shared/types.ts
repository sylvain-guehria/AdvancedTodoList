import { Detail } from '@/common/models/types/types'

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
