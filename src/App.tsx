import React from "react";
import { Provider } from "react-redux";

import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import createStore from "./redux/createStore";
import ApiClient from "./utils/ApiClient";

const client = new ApiClient();
const store = createStore(client, {});

export default function App() {
  return (
    <Provider store={store}>
      <Header />
      <LandingPage />
    </Provider>
  );
}
