import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { Settings } from "@/common/models/types";
import { RootState } from "../../state";
import { ActionTree } from "vuex";


export enum ActionTypes {
    FETCH_SETTINGS = "fetchSettings",
    SAVE_SETTINGS = "saveSettings",
  }
  

// for API, often async
export const actionsSettings : ActionTree<Settings, RootState> = {

    //SAVE SETTINGS
      async [ActionTypes.SAVE_SETTINGS](
        context,
        payload
      ): Promise<void> {

        Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);
    
        const { uid } = payload.uid;
    

        context.commit(MutationTypes.SET_LOADING, true);
        try {
          await database.ref(`settings/${uid}`).update({
            [payload.label]: payload.value
          });
          context.commit(MutationTypes.SET_LOADING, false);
        } catch (error) {
          context.commit(MutationTypes.SET_LOADING, false);
        }
      },

    //   FETCH SETTINGS
      async [ActionTypes.FETCH_SETTINGS](context, payload: string): Promise<void> {
        
        const uid: string = payload;
        let settings: Settings;

        context.commit(MutationTypes.SET_LOADING, true);
        try {
          await database.ref(`settings/${uid}`).once('value', (snapshot) => {
            settings = snapshot.val();
          }).then(() => {
            if (settings)  context.commit(MutationTypes.SET_SETTINGS, settings);
            context.commit(MutationTypes.SET_LOADING, false);
          });
        } catch (error) {
          context.commit(MutationTypes.SET_LOADING, false);
        }
      },
};