import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ClipListItem from "../components/ClipListItem";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchMyClips, fetchVideo } from "../redux/modules/clips";
import { StoreState } from "../redux/reducer";
import styled from "styled-components";
import { PageLayout, PageWrapper } from "../components/Page";
import MintModal from "../components/modals/MintModal";
import Clip from "../core/models/Clip";

const ClipsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

interface DashboardProps {
  myClips: Array<any>;
  fetchMyClips: () => Promise<AsyncAction>;
  fetchVideo: (id: string) => Promise<AsyncAction>;
}

const Dashboard: React.FC<DashboardProps> = ({
  myClips,
  fetchVideo,
  fetchMyClips,
}) => {
  const [activeClip, setActiveClip] = useState<Clip | null>(null);

  useEffect(() => {
    fetchMyClips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMint = (clip: Clip) => () => {
    // fetchVideo(clip.videoId);
    if (!activeClip) setActiveClip(clip);
  };

  const onClipClose = () => setActiveClip(null);

  return (
    <PageLayout>
      {activeClip && <MintModal clip={activeClip} onClose={onClipClose} />}
      <PageWrapper>
        <ClipsList>
          {myClips.map((clip) => (
            <ClipListItem key={clip.id} clip={clip} onMint={onMint(clip)} />
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
      fetchVideo,
    }
  )
)(Dashboard);
