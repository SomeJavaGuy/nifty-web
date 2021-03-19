import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
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
  }, []);

  const logIn = () => {
    console.log("LOG IN");
  };

  const logOut = () => {
    console.log("LOG OUT");
  };

  return (
    <div>
      {!loggedIn ? (
        <a href={`${Config.app.apiUrl}/auth/login/twitch`}>LOG IN</a>
      ) : (
        <div onClick={logOut}>LOG OUT</div>
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
