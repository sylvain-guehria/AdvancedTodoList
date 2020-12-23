import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { MutationTypes as settingsMutation } from "@/store/modules/settings/mutations";
import { User } from "@/common/models/types/index";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';


export enum ActionTypes {
  FETCH_USER = "fetchUser",
  SAVE_USER = "saveUser",
}


// for API, often async
export const actionsUser: ActionTree<User, RootState> = {

  //CREATE USER careful: only the first time
  async [ActionTypes.SAVE_USER](context, payload: User): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    if(!payload.data.uid) {return}

    await database.ref(`users/${payload.data.uid}`).set({
      ...payload.data,
    });
  },

  //FETCH USER
  async [ActionTypes.FETCH_USER](
    context,
    payload: string
  ): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const  uid = payload;
    let user: User;

    context.commit(settingsMutation.SET_LOADING, true);
    try {
      await database.ref(`users/${uid}`).once('value', (snapshot) => {
        user = snapshot.val();
      }).then(() => {
        if (user)  {
          context.commit(MutationTypes.SET_USER, {user, loggedIn: true});
        }
        context.commit(settingsMutation.SET_LOADING, false);
      });
    } catch (error) {
      context.commit(settingsMutation.SET_LOADING, false);
    }
    
  }

};