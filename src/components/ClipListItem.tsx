import React from "react";
import styled from "styled-components";

import Clip from "../core/models/Clip";
import { parseViewsNumber } from "../utils/NumberUtils";
import { FlexRow } from "./Flexbox";

const StyledClip = styled.div`
  background: #202026;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ClipThumb = styled.div<{ thumbnail: string }>`
  width: 100%;
  padding-bottom: 44%;
  background-image: url(${({ thumbnail }) => thumbnail});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ViewsItem = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const ClipMetadata = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  height: 100%;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ClipperName = styled.div`
  font-size: 12px;
  grid-area: creator;

  span {
    &:first-child {
      color: #898989;
      margin-right: 4px;
    }
  }
`;

const MintBtn = styled.button`
  grid-area: mint;
  font-size: 18px;
  color: #00ffba;
  font-weight: bold;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 2px 8px;
`;

interface ClipListItemProps {
  clip: Clip;
  onMint?: () => void;
}

const ClipListItem: React.FC<ClipListItemProps> = ({ clip, onMint }) => {
  const {
    id,
    title,
    broadcasterName,
    creatorName,
    thumbnailUrl,
    viewCount,
  } = clip;

  return (
    <StyledClip>
      <ClipThumb thumbnail={thumbnailUrl}>
        <ViewsItem>{parseViewsNumber(viewCount)} views</ViewsItem>
      </ClipThumb>
      <ClipMetadata>
        <Title>{title}</Title>
        <FlexRow align="center" justify="between">
          <ClipperName>
            <span>Clipped by</span>
            <span>{creatorName}</span>
          </ClipperName>
          <MintBtn onClick={onMint}>Mint</MintBtn>
        </FlexRow>
      </ClipMetadata>
    </StyledClip>
  );
};

export default ClipListItem;
