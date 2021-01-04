import { Message } from '@/common/models/types';

export interface User {
    loggedIn?: boolean;
    email?: string,
    messages?: Message[],
    pseudo?,
    roles?: [],
    uid?: string,
    displayName?: string,
    password?: string
  }

  export interface Users {
    user?: User,
    users?: User[]
  }