import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ClipListItem from "../components/ClipListItem";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchMyClips } from "../redux/modules/clips";
import { StoreState } from "../redux/reducer";
import styled from "styled-components";
import { PageLayout, PageWrapper } from "../components/Page";

const ClipsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

interface DashboardProps {
  myClips: Array<any>;
  fetchMyClips: () => Promise<AsyncAction>;
}

const Dashboard: React.FC<DashboardProps> = ({ myClips, fetchMyClips }) => {
  useEffect(() => {
    fetchMyClips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout>
      <PageWrapper>
        <ClipsList>
          {myClips.map((clip) => (
            <ClipListItem key={clip.id} clip={clip} />
          ))}
        </ClipsList>
      </PageWrapper>
    </PageLayout>
  );
};

export default compose<React.FC & DashboardProps>(
  connect(
    (state: StoreState) => ({
      loggedIn: !!state.auth.user,
      myClips: state.clips.myClips,
    }),
    {
      fetchMyClips,
    }
  )
)(Dashboard);
