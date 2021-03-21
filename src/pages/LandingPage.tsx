import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StoreState } from "../redux/reducer";
import styled from "styled-components";

const StyledLandingPage = styled.main`
  background-image: url("/landing-bg.png");
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
`;

const HeroSection = styled.section``;

const HeroSectionContent = styled.div`
  min-height: 500px;
  margin: 0 auto;
  max-width: 1480px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Heading1 = styled.h1`
  font-size: 48px;
  margin: 0;
  line-height: 65px;
  font-weight: bold;
`;

const Heading2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const TopStreamersSection = styled.section`
  max-width: 1480px;
  margin: 24px auto 54px;
`;

const HighLightSection = styled.section`
  max-width: 1480px;
  margin: 24px auto 54px;
`;

const SubText = styled.p``;

interface LandingPageProps {
  loggedIn: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn }) => {
  return (
    <StyledLandingPage>
      <HeroSection>
        <HeroSectionContent>
          <Heading1>
            Claim your Achievment
            <br />
            Game for Benifits exclusive!
          </Heading1>
          <SubText>
            Increase your Account by using special features and
            <br />
            promos from Achievment.
          </SubText>
        </HeroSectionContent>
      </HeroSection>
      <TopStreamersSection>
        <Heading2>TOP STREAMERS</Heading2>
      </TopStreamersSection>
      <HighLightSection>
        <Heading2>You won't believe these trickshots</Heading2>
      </HighLightSection>
      <HighLightSection>
        <Heading2>Insane luck</Heading2>
      </HighLightSection>
    </StyledLandingPage>
  );
};

export default compose<React.FC & LandingPageProps>(
  connect((state: StoreState) => ({
    loggedIn: !!state.auth.user,
  }))
)(LandingPage);
