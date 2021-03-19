import ErrorHandler from "../../utils/ErrorHandler";
import ApiClient from "../../utils/ApiClient";
import { Action, Dispatch } from "redux";

export type AsyncType = {
  INITIAL: string;
  SUCCESS: string;
  FAIL: string;
};

export const asyncType = (type: string) => ({
  INITIAL: type,
  SUCCESS: `${type}_SUCCESS`,
  FAIL: `${type}_FAIL`,
});

export interface AsyncResult {
  result: any;
  body?: any;
}

export interface AsyncAction extends Action {
  type: string;
  types: AsyncType;
  promise: Function;
  result?: AsyncResult;
  error?: any;
}

export default function asyncMiddleware(client: ApiClient) {
  return ({
    dispatch,
    getState,
  }: {
    dispatch: Function;
    getState: Function;
  }) => (next: Dispatch) => (
    action: AsyncAction | Function
  ): Promise<AsyncResult> | Action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    if (typeof types !== "object")
      throw new Error(
        `Async middleware error: 'promise' found in action creator, but 'types' property is invalid.`
      );

    const promiseObj = promise(client);

    next({ ...rest, type: types.INITIAL, promise: promiseObj });

    return new Promise((resolve, reject) => {
      promiseObj.then(
        (result: any) => {
          next({ ...rest, result, type: types.SUCCESS, promise: promiseObj });
          resolve(result);
        },
        (error: Error) => {
          ErrorHandler.trace("MIDDLEWARE ERROR:", error);
          next({ ...rest, error, type: types.FAIL, promise: promiseObj });
          reject(error);
        }
      );
    });
  };
}
