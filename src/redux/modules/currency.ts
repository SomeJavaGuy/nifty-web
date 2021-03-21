// https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR
import Status from "../../core/enums/Status";
import Currency from "../../core/models/Currency";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface CurrencyStore {
  currency: Currency | null;
  currencyStatus: Status;
}

const initialState = {
  currency: null,
  currencyStatus: Status.INITIAL,
};

const FETCH_MY_CLIPS = asyncType("redux/currency/FETCH_CURRENCY");

export default function reducer(
  state = initialState,
  action: AsyncAction
): CurrencyStore {
  switch (action.type) {
    case FETCH_MY_CLIPS.INITIAL: {
      return {
        ...state,
        currencyStatus: Status.LOADING,
      };
    }

    case FETCH_MY_CLIPS.SUCCESS: {
      return {
        ...state,
        currency: action.result?.body as Currency,
        currencyStatus: Status.SUCCESS,
      };
    }

    case FETCH_MY_CLIPS.FAIL: {
      return {
        ...state,
        currencyStatus: Status.FAIL,
      };
    }

    default:
      return state;
  }
}

export function fetchCurrency() {
  return {
    types: FETCH_MY_CLIPS,
    promise: (client: ApiClient) =>
      client.get(
        `https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=ETH`
      ),
  };
}
