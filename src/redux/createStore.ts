import { createStore as _createStore, applyMiddleware } from "redux";
import asyncMiddleware from "./middleware/asyncMiddleware";
import reducer from "./reducer";
import ApiClient from "../utils/ApiClient";

export default function createStore(apiClient: ApiClient, data = {}) {
  const middlewares = [asyncMiddleware(apiClient)];
  return applyMiddleware(...middlewares)(_createStore)(reducer, data);
}
