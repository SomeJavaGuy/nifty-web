import React from "react";
import { Portal } from "react-portal";
import styled from "styled-components";
import Clip from "../../core/models/Clip";
import { parseViewsNumber } from "../../utils/NumberUtils";
import { FlexRow } from "../Flexbox";
import OutsideClick from "../OutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  width: 580px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  outline: none;
`;

const SettingsWrapper = styled.div`
  margin-top: 24px;
  padding: 32px;
  background: #202026;
  border-radius: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Username = styled.div``;

const Clipper = styled.div`
  font-size: 12px;
  grid-area: creator;

  span {
    &:first-child {
      color: #898989;
      margin-right: 4px;
    }
  }
`;

const ViewsItem = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  align-self: flex-start;
`;

const MetadataWrapper = styled.div`
  flex: 1;
`;

interface MintModalProps {
  clip: Clip;
  onClose: () => void;
}

const MintModal: React.FC<MintModalProps> = ({ clip, onClose }) => {
  const { broadcasterName, creatorName, title, viewCount } = clip;

  return (
    <Portal>
      <OutsideClick onTrigger={onClose}>
        <StyledModal>
          <VideoWrapper>
            <Frame
              title="twich video"
              src={`${clip.embedUrl}&parent=localhost`}
            />
            {/* <video controls src={embedUrl} poster={thumbnailUrl} /> */}
          </VideoWrapper>
          <SettingsWrapper>
            <FlexRow>
              <MetadataWrapper>
                <Title>{title}</Title>
                <Username>{broadcasterName}</Username>
                <Clipper>
                  <span>Clipped by</span>
                  <span>{creatorName}</span>
                </Clipper>
              </MetadataWrapper>
              <ViewsItem>{parseViewsNumber(viewCount)} views</ViewsItem>
            </FlexRow>
          </SettingsWrapper>
        </StyledModal>
      </OutsideClick>
    </Portal>
  );
};

export default MintModal;
