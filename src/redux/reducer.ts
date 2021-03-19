/*
 * This combines the reducer modules located in ./modules.
 * No reducer switch/cases should be written in this file.
 */
import { combineReducers } from "redux";

import { AsyncAction } from "./middleware/asyncMiddleware";
import auth, { AuthStore } from "./modules/auth";
import clips, { ClipsStore } from "./modules/clips";

export interface StoreState {
  auth: AuthStore;
  clips: ClipsStore;
}

const combinedReducers = combineReducers({
  auth,
  clips,
});

export default function (state: any, action: AsyncAction) {
  // Action<any>
  return combinedReducers(state, action);
}
