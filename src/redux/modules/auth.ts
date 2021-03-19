import Config from "../../core/Config";
import Status from "../../core/enums/Status";
import User from "../../core/models/User";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface AuthStore {
  user: User | null;
  profileStatus: Status;
}

const initialState = {
  user: null,
  profileStatus: Status.INITIAL,
};

const FETCH_PROFILE = asyncType("redux/auth/FETCH_PROFILE");

export default function reducer(
  state = initialState,
  action: AsyncAction
): AuthStore {
  switch (action.type) {
    case FETCH_PROFILE.INITIAL: {
      return {
        ...state,
        profileStatus: Status.LOADING,
      };
    }

    case FETCH_PROFILE.SUCCESS: {
      return {
        ...state,
        user: action.result?.body as User,
        profileStatus: Status.SUCCESS,
      };
    }

    case FETCH_PROFILE.FAIL: {
      return {
        ...state,
        profileStatus: Status.FAIL,
      };
    }

    default:
      return state;
  }
}

export function fetchProfile() {
  return {
    types: FETCH_PROFILE,
    promise: (client: ApiClient) =>
      client.get(`${Config.app.apiUrl}/auth/profile`),
  };
}
