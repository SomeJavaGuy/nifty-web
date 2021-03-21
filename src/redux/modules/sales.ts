import Config from "../../core/Config";
import Status from "../../core/enums/Status";
import MintingSettings from "../../core/models/MintingSettings";
import Sale from "../../core/models/Sale";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface SaleStore {
  activeSaleItem: Sale | null;
  activeSaleItemStatus: Status;

  featuredSales: Array<Sale>;
  featuredSalesStatus: Status;

  mySales: Array<Sale>;
  mySalesStatus: Status;
}

const initialState = {
  activeSaleItem: null,
  activeSaleItemStatus: Status.INITIAL,

  featuredSales: [],
  featuredSalesStatus: Status.INITIAL,

  mySales: [],
  mySalesStatus: Status.INITIAL,
};

const FETCH_FEATURED = asyncType("redux/sales/FETCH_FEATURED");
const FETCH_MY_SALES = asyncType("redux/sales/FETCH_MY_SALES");
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

    case FETCH_FEATURED.INITIAL: {
      return {
        ...state,
        featuredSalesStatus: Status.LOADING,
      };
    }

    case FETCH_FEATURED.SUCCESS: {
      return {
        ...state,
        featuredSales: action.result?.body as Array<Sale>,
        featuredSalesStatus: Status.SUCCESS,
      };
    }

    case FETCH_FEATURED.FAIL: {
      return {
        ...state,
        featuredSalesStatus: Status.FAIL,
      };
    }

    case FETCH_MY_SALES.INITIAL: {
      return {
        ...state,
        mySalesStatus: Status.LOADING,
      };
    }

    case FETCH_MY_SALES.SUCCESS: {
      return {
        ...state,
        mySales: action.result?.body as Array<Sale>,
        mySalesStatus: Status.SUCCESS,
      };
    }

    case FETCH_MY_SALES.FAIL: {
      return {
        ...state,
        mySalesStatus: Status.FAIL,
      };
    }

    default:
      return state;
  }
}

export function fetchFeatured() {
  return {
    types: FETCH_FEATURED,
    promise: (client: ApiClient) =>
      client.get(`${Config.app.apiUrl}/sales/featured`),
  };
}

export function fetchMySales() {
  return {
    types: FETCH_MY_SALES,
    promise: (client: ApiClient) => client.get(`${Config.app.apiUrl}/sales/me`),
  };
}

export function mintMyClip(id: string, mintingSettings: MintingSettings) {
  return {
    types: MINT_MY_CLIP,
    promise: (client: ApiClient) =>
      client.post(`${Config.app.apiUrl}/mint/${id}`, {
        body: JSON.stringify(mintingSettings),
      }),
  };
}
