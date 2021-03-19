import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ClipListItem from "../components/ClipListItem";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchMyClips } from "../redux/modules/clips";
import { StoreState } from "../redux/reducer";

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
    <div>
      <div>DASHBOARD</div>
      <div>
        {myClips.map((clip) => (
          <ClipListItem key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
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
