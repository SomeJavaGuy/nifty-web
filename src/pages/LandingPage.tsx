import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { StoreState } from "../redux/reducer";

interface LandingPageProps {
  loggedIn: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn }) => {
  return (
    <div>
      LANDING PAGE
      {loggedIn && <div>LOGGED IN</div>}
    </div>
  );
};

export default compose<React.FC & LandingPageProps>(
  connect((state: StoreState) => ({
    loggedIn: !!state.auth.user,
  }))
)(LandingPage);
