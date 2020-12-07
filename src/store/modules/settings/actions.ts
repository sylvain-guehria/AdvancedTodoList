import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { Settings } from "@/common/models/types/types";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index'; 
import { MutationTypes as todosMutationType } from '@/store/modules/todos/mutations';



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
    
        const { uid } = store.getters.getUser.data;
    

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
      async [ActionTypes.FETCH_SETTINGS](context): Promise<void> {
        
        const { uid } = store.getters.getUser.data;
        let settings: Settings;

        context.commit(MutationTypes.SET_LOADING, true);
        try {
          await database.ref(`settings/${uid}`).once('value', (snapshot) => {
            settings = snapshot.val();
          }).then(() => {
            if (settings)  {
              context.commit(MutationTypes.SET_SETTINGS, settings);
            }
            context.commit(MutationTypes.SET_LOADING, false);
          });
        } catch (error) {
          context.commit(MutationTypes.SET_LOADING, false);
        }
      },
};