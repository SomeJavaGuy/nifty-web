import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import styled from "styled-components";

import Config from "../core/Config";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchProfile } from "../redux/modules/auth";
import { fetchCurrency } from "../redux/modules/currency";
import { StoreState } from "../redux/reducer";

const HeaderWrapper = styled.div`
  padding: 0 68px;
  background: #18181d;
`;

const StyledHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  img {
    display: block;
    margin: 0;
  }
`;

const LoginBtn = styled.a`
  border: 2px solid #a76efc;
  border-radius: 25px;
  padding: 12px 24px 12px 56px;
  text-decoration: none;
  font-weight: 600;
  color: #a76efc;
  position: relative;
  transition: all 250ms ease-in-out;

  &::before {
    content: "";
    display: block;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: 24px;
    width: 32px;
    height: 32px;
    background-image: url("/twitch.svg");
    background-position: center;
    background-size: contain;
    transition: all 250ms ease-in-out;
  }

  span {
    margin-left: 20px;
  }

  &:hover {
    background: #673ab7;
    border: 2px solid #a76efc;
    color: #e7d6ff;

    &::before {
      background-image: url("/twitch-white.svg");
    }
  }
`;

const BaseLink = styled(Link)`
  padding: 12px 32px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50px;
  font-size: 14px;
  letter-spacing: 0.2px;
  margin: 0 6px;
  display: inline-block;
`;

const PrimaryButton = styled(BaseLink)`
  color: black;
  background: #00ffba;
`;

const SecondaryButton = styled(BaseLink)`
  border: 1px solid #2c2c2c;
  color: white;
`;

const SearchWrapper = styled.div`
  max-width: 520px;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url("/search.svg");
    background-size: contain;
    background-position: center;
  }
`;

const Search = styled.input`
  height: 48px;
  padding: 0 22px;
  background: #202026;
  border: 1px solid #2c2c2c;
  border-radius: 5px;
  width: calc(100% - 46px);
  font-size: 14px;
  color: #959caf;
  outline: none;
  transition: all 250ms ease-in-out;

  &:focus {
    border: 1px solid white;
  }

  &::-webkit-input-placeholder {
    color: #959caf;
    font-weight: semibold;
  }
  &::-moz-placeholder {
    color: #959caf;
    font-weight: semibold;
  }
  &:-ms-input-placeholder {
    color: #959caf;
    font-weight: semibold;
  }
  &:-moz-placeholder {
    color: #959caf;
    font-weight: semibold;
  }
`;

interface HeaderProps {
  loggedIn: boolean;
  fetchProfile: () => Promise<AsyncAction>;
  fetchCurrency: () => Promise<AsyncAction>;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  fetchProfile,
  fetchCurrency,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchChange = (e: any) => setSearch(e.target.value);

  return (
    <HeaderWrapper>
      <StyledHeader>
        <Logo to="/">
          <img src="/logo.svg" alt="Nifty logo" />
        </Logo>

        <SearchWrapper>
          <Search
            placeholder="Search..."
            value={search}
            onChange={onSearchChange}
          />
        </SearchWrapper>

        {loggedIn && (
          <div>
            <PrimaryButton to="/dashboard">My Clip Feed</PrimaryButton>
            <SecondaryButton to="/profile">Profile</SecondaryButton>
          </div>
        )}

        {!loggedIn && (
          <LoginBtn href={`${Config.app.apiUrl}/auth/login/twitch`}>
            <span>Link Twitch.tv</span>
          </LoginBtn>
        )}
      </StyledHeader>
    </HeaderWrapper>
  );
};

export default compose<React.FC & HeaderProps>(
  connect(
    (state: StoreState) => ({
      loggedIn: !!state.auth.user,
    }),
    {
      fetchProfile,
      fetchCurrency,
    }
  )
)(Header);
