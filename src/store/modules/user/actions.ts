import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { User } from "@/common/models/types";
import { RootState } from "../../state";
import { ActionTree } from "vuex";


export enum ActionTypes {
  FETCH_USER = "fetchUser",
  SAVE_USER = "saveUser",
}


// for API, often async
export const actionsUser: ActionTree<User, RootState> = {

  //FETCH USER
  async [ActionTypes.FETCH_USER](
    context,
    payload
  ): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = payload.uid;

      await database.ref(`users/${uid}`).set({
        user: payload
      }).then(() => {
        context.commit(MutationTypes.SET_USER, payload);
      })
  }

};