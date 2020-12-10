import { User } from "@/common/models/types/index";

export const initialState: User =  {
  loggedIn: false,
  data:{}
  }

export const stateUser = { ...initialState };



