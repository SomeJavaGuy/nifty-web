import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StoreState } from "../redux/reducer";
import { fetchMyClips } from "../redux/modules/clips";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";

interface LandingPageProps {
  loggedIn: boolean;
  myClips: Array<any>;
  fetchMyClips: () => Promise<AsyncAction>;
}

const LandingPage: React.FC<LandingPageProps> = ({
  loggedIn,
  myClips,
  fetchMyClips,
}) => {
  useEffect(() => {
    if (loggedIn) {
      fetchMyClips();
    }
  }, [loggedIn]);

  console.log("MY CLIPS", myClips);

  return (
    <div>
      LANDING PAGE
      {loggedIn && <div>LOGGED IN</div>}
    </div>
  );
};

export default compose<React.FC & LandingPageProps>(
  connect(
    (state: StoreState) => ({
      loggedIn: !!state.auth.user,
      myClips: state.clips.myClips,
    }),
    {
      fetchMyClips,
    }
  )
)(LandingPage);
