import Config from "../../core/Config";
import Status from "../../core/enums/Status";
import Clip from "../../core/models/Clip";
import User from "../../core/models/User";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface ClipsStore {
  myClips: Array<Clip>;
  myClipsStatus: Status;
}

const initialState = {
  myClips: [] as Array<Clip>,
  myClipsStatus: Status.INITIAL,
};

const FETCH_MY_CLIPS = asyncType("redux/clips/FETCH_MY_CLIPS");

export default function reducer(
  state = initialState,
  action: AsyncAction
): ClipsStore {
  switch (action.type) {
    case FETCH_MY_CLIPS.INITIAL: {
      return {
        ...state,
        myClipsStatus: Status.LOADING,
      };
    }

    case FETCH_MY_CLIPS.SUCCESS: {
      return {
        ...state,
        myClips: action.result?.body,
        myClipsStatus: Status.SUCCESS,
      };
    }

    case FETCH_MY_CLIPS.FAIL: {
      return {
        ...state,
        myClipsStatus: Status.FAIL,
      };
    }

    default:
      return state;
  }
}

export function fetchMyClips() {
  return {
    types: FETCH_MY_CLIPS,
    promise: (client: ApiClient) =>
      client.get(`${Config.app.apiUrl}/twitch/clips`),
  };
}
