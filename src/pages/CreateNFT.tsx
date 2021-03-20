import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { compose } from "redux";

import Status from "../core/enums/Status";
import Clip from "../core/models/Clip";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import { fetchMyClip } from "../redux/modules/clips";
import { StoreState } from "../redux/reducer";

interface CreateNFTProps {
  activeClip: Clip;
  activeClipStatus: Status;
  fetchMyClip: (id: string) => Promise<AsyncAction>;
}

const CreateNFT: React.FC<CreateNFTProps> = ({
  activeClip,
  activeClipStatus,
  fetchMyClip,
}) => {
  const { clipId } = useParams<{ clipId: string }>();

  console.log(clipId);

  return <div>CreateNFT</div>;
};

export default compose<React.FC & CreateNFTProps>(
  connect(
    (state: StoreState) => ({
      activeClip: state.clips.activeClip,
      activeClipStatus: state.clips.activeClipStatus,
    }),
    {
      fetchMyClip,
    }
  )
)(CreateNFT);
