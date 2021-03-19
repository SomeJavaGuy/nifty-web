import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateNFT from "./pages/CreateNFT";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import createStore from "./redux/createStore";
import ApiClient from "./utils/ApiClient";

const client = new ApiClient();
const store = createStore(client, {});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/dashboard"
            component={() => (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            )}
          />
          <Route
            exact
            path="/create/:clipId"
            component={() => (
              <PrivateRoute>
                <CreateNFT />
              </PrivateRoute>
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}
