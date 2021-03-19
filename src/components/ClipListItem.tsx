import React from "react";
import Clip from "../core/models/Clip";

interface ClipListItemProps {
  clip: Clip;
}

const ClipListItem: React.FC<ClipListItemProps> = ({ clip }) => {
  const { title, broadcasterName, creatorName, thumbnailUrl, viewCount } = clip;

  return (
    <div>
      <div>
        <div>VIEWS: {viewCount}</div>
        <img src={thumbnailUrl} alt={title} />
      </div>
      <div>
        <div>{title}</div>
        <div>{broadcasterName}</div>
        <div>Clipped by {creatorName}</div>
      </div>
    </div>
  );
};

export default ClipListItem;
