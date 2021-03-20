import Config from "../../core/Config";
import Status from "../../core/enums/Status";
import Clip from "../../core/models/Clip";
import MintingSettings from "../../core/models/MintingSettings";
import ApiClient from "../../utils/ApiClient";
import { AsyncAction, asyncType } from "../middleware/asyncMiddleware";

export interface ClipsStore {
  myClips: Array<Clip>;
  myClipsStatus: Status;

  activeClip: Clip | null;
  activeClipStatus: Status;

  activeVideo: any;
  activeVideoStatus: Status;
}

const initialState = {
  myClips: [] as Array<Clip>,
  myClipsStatus: Status.INITIAL,

  activeClip: null,
  activeClipStatus: Status.INITIAL,

  activeVideo: null,
  activeVideoStatus: Status.INITIAL,
};

const FETCH_MY_CLIPS = asyncType("redux/clips/FETCH_MY_CLIPS");
const FETCH_MY_CLIP = asyncType("redux/clips/FETCH_MY_CLIP");
const FETCH_VIDEO = asyncType("redux/clips/FETCH_VIDEO");

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

    case FETCH_MY_CLIP.INITIAL: {
      return {
        ...state,
        activeClipStatus: Status.LOADING,
      };
    }

    case FETCH_MY_CLIP.SUCCESS: {
      return {
        ...state,
        activeClip: action.result?.body as Clip,
        activeClipStatus: Status.SUCCESS,
      };
    }

    case FETCH_MY_CLIP.FAIL: {
      return {
        ...state,
        activeClipStatus: Status.FAIL,
      };
    }

    case FETCH_VIDEO.INITIAL: {
      return {
        ...state,
        activeClipStatus: Status.LOADING,
      };
    }

    case FETCH_VIDEO.SUCCESS: {
      return {
        ...state,
        activeClip: action.result?.body as Clip,
        activeClipStatus: Status.SUCCESS,
      };
    }

    case FETCH_VIDEO.FAIL: {
      return {
        ...state,
        activeClipStatus: Status.FAIL,
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

export function fetchMyClip(id: string) {
  return {
    types: FETCH_MY_CLIP,
    promise: (client: ApiClient) =>
      client.get(`${Config.app.apiUrl}/twitch/clip/${id}`),
  };
}

export function fetchVideo(id: string) {
  return {
    types: FETCH_VIDEO,
    promise: (client: ApiClient) =>
      client.get(`${Config.app.apiUrl}/twitch/video/${id}`),
  };
}

export function mintMyClip(id: string, mintingSettings: MintingSettings) {
  return {
    types: FETCH_MY_CLIP,
    promise: (client: ApiClient) =>
      client.post(`${Config.app.apiUrl}/twitch/clip/${id}`, {
        body: JSON.stringify(mintingSettings),
      }),
  };
}
