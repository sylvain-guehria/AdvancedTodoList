import { User } from "@/common/models/types/types";

export const initialState: User =  {
  loggedIn: false,
  data:{}
  }

export const stateUser = { ...initialState };



