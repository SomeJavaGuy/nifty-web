import React from "react";
import styled from "styled-components";

const StyledStreamer = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  grid-gap: 8px;
  align-items: center;
`;

const StreamerThumbnail = styled.div<{ src: string }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StreamerTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const StreamerHighlights = styled.div`
    span {
        font-size. 14px;
        &:first-child {
            font-weight: bold;
            color: #00FFBA;
            margin-right: 6px;
        }

        &:last-child {
            color: #A0A0A0;
        }
    }
`;

interface StreamerItemProps {
  name: string;
  thumbnail: string;
  highlights: number;
}

const StreamerItem: React.FC<StreamerItemProps> = ({
  name,
  thumbnail,
  highlights,
}) => {
  return (
    <StyledStreamer>
      <StreamerThumbnail src={thumbnail} />
      <div>
        <StreamerTitle>{name}</StreamerTitle>
        <StreamerHighlights>
          <span>{highlights}</span>
          <span>Highlights</span>
        </StreamerHighlights>
      </div>
    </StyledStreamer>
  );
};
export default StreamerItem;
