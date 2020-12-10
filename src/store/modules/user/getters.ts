import { User } from "@/common/models/types/index";
import { GetterTree } from "vuex";
import { RootState } from "../../state";

export const gettersUser : GetterTree<User, RootState> = {
  getUser: (stateUser: User) => {
    if (stateUser) return stateUser;
  },
};