import { User, Users } from "@/common/models/types/index";
import { GetterTree } from "vuex";
import { RootState } from "../../state";

export const gettersUsers : GetterTree<Users, RootState> = {
  getUser: (state) => {
    return state.user;
  },
  getUsers: (state) => {
    return state.users;
  },
};