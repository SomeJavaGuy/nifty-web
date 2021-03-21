import Config from "../../core/Config";
import Status from "../../core/enums/Status";
import MintingSettings from "../../core/models/MintingSettings";
import Sale from "../../core/models/Sale";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface SaleStore {
  activeSaleItem: Sale | null;
  activeSaleItemStatus: Status;
}

const initialState = {
  activeSaleItem: null,
  activeSaleItemStatus: Status.INITIAL,
};

const MINT_MY_CLIP = asyncType("redux/sales/MINT_MY_CLIP");

export default function reducer(
  state = initialState,
  action: AsyncAction
): SaleStore {
  switch (action.type) {
    case MINT_MY_CLIP.INITIAL: {
      return {
        ...state,
        activeSaleItemStatus: Status.LOADING,
      };
    }

    case MINT_MY_CLIP.SUCCESS: {
      return {
        ...state,
        activeSaleItem: action.result?.body as Sale,
        activeSaleItemStatus: Status.SUCCESS,
      };
    }

    case MINT_MY_CLIP.FAIL: {
      return {
        ...state,
        activeSaleItemStatus: Status.FAIL,
      };
    }

    default:
      return state;
  }
}

export function mintMyClip(id: string, mintingSettings: MintingSettings) {
  return {
    types: MINT_MY_CLIP,
    promise: (client: ApiClient) =>
      client.post(`${Config.app.apiUrl}/twitch/clip/${id}`, {
        body: JSON.stringify(mintingSettings),
      }),
  };
}
