import { Users } from "@/common/models/types/index";

export const initialState: Users = {
  user: {
    loggedIn: false
  },
  users: []
}

export const stateUsers = { ...initialState };



