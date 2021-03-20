import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { PageLayout, PageWrapper } from "../components/Page";

import User from "../core/models/User";
import { StoreState } from "../redux/reducer";

import styled from "styled-components";
import { FlexCol, FlexRow } from "../components/Flexbox";

const HeadingWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto 48px;
  padding: 0 80px;
`;

const Heading2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 0;
`;

const Avatar = styled.div<{ src?: string }>`
  ${({ src }) => src && `background: url(${src});`}
  background-color: #5D5D5D;
  background-position: center;
  background-size: cover;
  width: 78px;
  height: 78px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
`;

const Highlights = styled.div`
  span {
    color: #a0a0a0;
    font-size: 20px;
    line-height: 16px;

    &:first-child {
      color: #00ffba;
      font-weight: bold;
      margin-right: 4px;
    }
  }
`;

const Description = styled.p`
  margin-top: 16px;
  max-width: 800px;
  font-size: 14px;
`;

const ClipsSection = styled.section``;

const SubHeader = styled(Heading2)`
  padding: 0 80px;
`;

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { displayName, profileImage, description } = user;

  return (
    <PageLayout>
      <PageWrapper>
        <HeadingWrapper>
          <FlexRow>
            <Avatar src={profileImage} />
            <FlexCol justify="center">
              <Title>{displayName}</Title>
              <Highlights>
                <span>140</span>
                <span>Highlights</span>
              </Highlights>
            </FlexCol>
          </FlexRow>
          <Description>{description}</Description>
        </HeadingWrapper>

        <ClipsSection>
          <SubHeader>NEW Clips</SubHeader>
        </ClipsSection>
      </PageWrapper>
    </PageLayout>
  );
};

export default compose<React.FC & ProfileProps>(
  connect((state: StoreState) => ({
    user: state.auth.user,
  }))
)(Profile);
