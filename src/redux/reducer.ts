/*
 * This combines the reducer modules located in ./modules.
 * No reducer switch/cases should be written in this file.
 */
import { combineReducers } from "redux";

import { AsyncAction } from "./middleware/asyncMiddleware";
import auth, { AuthStore } from "./modules/auth";
import clips, { ClipsStore } from "./modules/clips";
import sales, { SaleStore } from "./modules/sales";
import currency, { CurrencyStore } from "./modules/currency";

export interface StoreState {
  auth: AuthStore;
  clips: ClipsStore;
  sales: SaleStore;
  currency: CurrencyStore;
}

const combinedReducers = combineReducers({
  auth,
  clips,
  sales,
  currency,
});

export default function (state: any, action: AsyncAction) {
  return combinedReducers(state, action);
}
