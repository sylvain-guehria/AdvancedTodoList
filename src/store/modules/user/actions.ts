import { database } from '@/apis/firebase/firebase';
import { MutationTypes as settingsMutation } from "@/store/modules/settings/mutations";
import { MutationTypes as userMutationTypes } from './mutations'
import { MutationTypes } from "@/store/modules/todos/mutations";

import { Message, User } from "@/common/models/types/index";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';


export enum ActionTypes {
  FETCH_USER = "fetchUser",
  SAVE_USER = "saveUser",
  FETCH_USERS = "fetchUsers",
  SEND_MSG = "sendMsg",
  DELETE_USER = "deleteUser",
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

    if(!payload){return}

    const  uid = payload;
    let user: User;

    context.commit(settingsMutation.SET_LOADING, true);
    try {
      await database.ref(`users/${uid}`).once('value', (snapshot) => {
        user = snapshot.val();
      }).then(() => {
        if (user)  {
          context.commit(userMutationTypes.SET_USER, {user, loggedIn: true});
        }
        context.commit(settingsMutation.SET_LOADING, false);
      });
    } catch (error) {
      context.commit(settingsMutation.SET_LOADING, false);
    }
    
  },

   //FETCH USERS
   async [ActionTypes.FETCH_USERS](
    context,
  ): Promise<void> {

    let users: User[];
    context.commit(settingsMutation.SET_LOADING, true);

    let user = store.getters.getUser
    let userRole = [];
    let isadmin: boolean= false;
    let listUsers: User[]= [];

    if(user && user.data && user.data.roles){
      userRole = user.data.roles;
      isadmin = userRole.includes('admin');
    }
    if(!isadmin){return}

    try {
      await database.ref(`users`).once('value', (snapshot) => {
        users = snapshot.val();

        listUsers = Object.entries(snapshot.val()).reduce((acc, [key, user]) => {
          user['key'] = key;

        acc.push(user);
        return acc;
      }, []);

      }).then(() => {
        if (users)  {
          context.commit(MutationTypes.SET_USERS, listUsers);
        }
        context.commit(settingsMutation.SET_LOADING, false);
      });
    } catch (error) {
      context.commit(settingsMutation.SET_LOADING, false);
    }
  },

   //SEND MSG
   async [ActionTypes.SEND_MSG](context, payload: Message): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const uid = store.getters.getUser.data.uid;

    if(!payload || !uid) {return}
    
    await database.ref(`users/${uid}/messages`).push({
      ...payload,
    });
  },

};