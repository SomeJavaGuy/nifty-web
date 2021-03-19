import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";

import Status from "../core/enums/Status";
import { StoreState } from "../redux/reducer";

interface PrivateRouteProps {
  loggedIn: boolean;
  status: Status;
  children: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  loggedIn,
  status,
  children,
}) => {
  if (status === Status.SUCCESS && loggedIn) {
    return children;
  } else if ([Status.SUCCESS, Status.FAIL].includes(status) && !loggedIn) {
    return <Redirect to="/" />;
  } else {
    return null;
  }
};

export default compose<React.FC & PrivateRouteProps>(
  connect((state: StoreState) => ({
    loggedIn: !!state.auth.user,
    status: state.auth.profileStatus,
  }))
)(PrivateRoute);
