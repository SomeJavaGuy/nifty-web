import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import Config from "../core/Config";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchProfile } from "../redux/modules/auth";
import { StoreState } from "../redux/reducer";

interface HeaderProps {
  loggedIn: boolean;
  fetchProfile: () => Promise<AsyncAction>;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, fetchProfile }) => {
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!loggedIn && (
        <a href={`${Config.app.apiUrl}/auth/login/twitch`}>LOG IN</a>
      )}

      {loggedIn && (
        <>
          <Link to="/">Landing page</Link>
          <Link to="/dashboard">Dashboard</Link>
        </>
      )}
    </div>
  );
};

export default compose<React.FC & HeaderProps>(
  connect(
    (state: StoreState) => ({
      loggedIn: !!state.auth.user,
    }),
    {
      fetchProfile,
    }
  )
)(Header);
