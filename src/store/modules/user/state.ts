import { User } from "@/common/models/types";

export const initialState: User =  {
  loggedIn: false,
  data:{}
  }

export const stateUser = { ...initialState };



