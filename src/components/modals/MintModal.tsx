import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styled from "styled-components";

import SaleType from "../../core/enums/SaleType";
import Clip from "../../core/models/Clip";
import MintingSettings from "../../core/models/MintingSettings";
import { AsyncAction } from "../../redux/middleware/asyncMiddleware";
import { mintMyClip } from "../../redux/modules/sales";
import { StoreState } from "../../redux/reducer";
import { parseViewsNumber } from "../../utils/NumberUtils";
import { FlexRow } from "../Flexbox";
import Modal from "./Modal";

const StyledModal = styled.div`
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 60px;
  max-width: 1600px;
  width: calc(100% - 120px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
  padding-bottom: 80px;
`;

const HeadingWrapper = styled(FlexRow)`
  margin-bottom: 16px;
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

const AuctionTypeWrapper = styled.div`
  margin: 8px 0 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 16px;
  align-items: center;
`;

const AuctionType = styled.div<{ active?: boolean }>`
  border: 2px solid
    rgba(0, 255, 186, ${({ active }) => (active ? "1" : "0.25")});
  border-radius: 12px;
  padding: 24px 16px;
  cursor: pointer;
  user-select: none;
  transition: all 250ms ease-in-out;
  ${({ active }) => active && "background: #00FFBA;"}

  ${({ active }) =>
    !active &&
    `
    &:hover {
        border: 2px solid rgba(0, 255, 186, 1);
    }
  `}

  div {
    color: ${({ active }) => (active ? "#000000" : "#00FFBA")};
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    margin-bottom: 8px;
  }

  p {
    color: ${({ active }) => (active ? "#000000" : "#898989")};
    font-size: 14px;
    margin: 0;
    text-align: center;
  }
`;

const TypeOr = styled.div`
  color: #00ffba;
  font-weight: bold;
`;

const Heading4 = styled.h4`
  color: #00ffba;
  margin: 8px 0;
  font-size: 16px;
  font-weight: bold;
`;

const BuyerCategorySelection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;

  > div {
    margin-right: 8px;
  }
`;

const Chip = styled.div<{ active?: boolean }>`
  border: 1px solid
    ${({ active }) =>
      active ? "rgba(0, 255, 186, 1)" : "rgba(255, 255, 255, 0.5)"};
  color: ${({ active }) =>
    active ? "rgba(0, 255, 186, 1)" : "rgba(255, 255, 255, 0.5)"};
  border-radius: 4px;
  padding: 4px 24px;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  user-select: none;
  &:hover {
    border: 1px solid #00ffba;
  }
`;

const FormWrapper = styled.div``;

const StyledField = styled(TextField)`
  width: 100%;
  margin: 20px 0 48px !important;

  .MuiInput-underline {
    &:hover {
      &:not(.Mui-disabled) {
        &::before {
          border-bottom: 2px solid #37373c;
        }
      }
    }

    &::before {
      border-bottom: 2px solid #37373c;
    }
    &::after {
      border-bottom: 2px solid #c9c9c9;
    }
  }

  .MuiFormLabel-root {
    color: #c9c9c9;

    &.Mui-focused {
      color: #c9c9c9;
    }
  }

  .MuiInputBase-root {
    font-family: "Open Sans", sans-serif;
  }

  .MuiInputBase-input {
    font-size: 16px;
    color: #00ffba !important;
  }
`;

const DoubleColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

const ModalFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 16px;
  margin-top: 54px;
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 12px 0;
  outline: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 24px;
`;

const PrimaryButton = styled(BaseButton)`
  font-weight: bold;
  color: #00ffba;
  background: rgba(0, 255, 186, 0.25);
  border: 1px solid #2c2c2c;
`;

const SecondaryButton = styled(BaseButton)`
  background: #2c2c2c;
  color: white;
  font-weight: 500;
  border: none;
`;

interface MintModalProps {
  clip: Clip;
  onClose: () => void;
}

interface ComposeProps {
  mintMyClip: (
    id: string,
    mintingSettings: MintingSettings
  ) => Promise<AsyncAction>;
}

const MintModal: React.FC<MintModalProps & ComposeProps> = ({
  clip,
  onClose,
  mintMyClip,
}) => {
  const [mintingSettings, setMintingSettings] = useState<MintingSettings>({
    saleType: SaleType.LimitedTime,
    startTime: new Date(),
    endTime: new Date(),
  });

  const { broadcasterName, creatorName, title, viewCount } = clip;

  const {
    saleType,
    startTime,
    endTime,
    subscribersAllowed,
    followersAllowed,
    copies,
    description,
    startingPrice,
  } = mintingSettings;

  console.log(clip);

  const setSaleType = (saleType: SaleType) => () =>
    setMintingSettings({
      ...mintingSettings,
      saleType,
    });

  const toggleAllowSubs = () => {
    setMintingSettings({
      ...mintingSettings,
      subscribersAllowed: !subscribersAllowed,
    });
  };

  const toggleAllowFollowers = () => {
    setMintingSettings({
      ...mintingSettings,
      followersAllowed: !followersAllowed,
    });
  };

  const onChangePrice = (e: any) => {
    setMintingSettings({
      ...mintingSettings,
      startingPrice: isNaN(parseInt(e.target.value))
        ? undefined
        : Number(e.target.value),
    });
  };

  const onStartTimeChange = (e: any) => {
    try {
      setMintingSettings({
        ...mintingSettings,
        startTime: new Date(e.target.value),
      });
    } catch (e) {
      setMintingSettings({
        ...mintingSettings,
        startTime: undefined,
      });
    }
  };

  const onEndTimeChange = (e: any) => {
    try {
      setMintingSettings({
        ...mintingSettings,
        startTime: new Date(e.target.value),
      });
    } catch (e) {
      setMintingSettings({
        ...mintingSettings,
        startTime: undefined,
      });
    }
  };

  const onDescriptionChange = (e: any) => {
    setMintingSettings({
      ...mintingSettings,
      description: e.target.value,
    });
  };

  const createMint = () =>
    mintMyClip(clip.id, mintingSettings)
      .then(onClose)
      .catch((e) => {
        console.log("Failed to create nft!");
      });

  return (
    <Modal onClose={onClose}>
      <StyledModal>
        <VideoWrapper>
          <Frame title={title} src={`${clip.embedUrl}&parent=localhost`} />
        </VideoWrapper>
        <SettingsWrapper>
          <HeadingWrapper>
            <MetadataWrapper>
              <Title>{title}</Title>
              <Username>{broadcasterName}</Username>
              <Clipper>
                <span>Clipped by</span>
                <span>{creatorName}</span>
              </Clipper>
            </MetadataWrapper>
            <ViewsItem>{parseViewsNumber(viewCount)} views</ViewsItem>
          </HeadingWrapper>

          <Heading4>Lorem ipsum</Heading4>

          <AuctionTypeWrapper>
            <AuctionType
              active={saleType === SaleType.LimitedQuantity}
              onClick={setSaleType(SaleType.LimitedQuantity)}
            >
              <div>Limited QTY</div>
              <p>
                Increase your Account by using special features and promos from
                Achievment.
              </p>
            </AuctionType>
            <TypeOr>or</TypeOr>
            <AuctionType
              active={saleType === SaleType.LimitedTime}
              onClick={setSaleType(SaleType.LimitedTime)}
            >
              <div>Limited Timeframe</div>
              <p>
                Increase your Account by using special features and promos from
                Achievment.
              </p>
            </AuctionType>
          </AuctionTypeWrapper>

          <FormWrapper>
            <StyledField
              type="number"
              label="Starting price"
              value={startingPrice}
              onChange={onChangePrice}
            />

            <DoubleColGrid>
              <StyledField
                label="Starts"
                type="datetime-local"
                defaultValue={startTime?.toString()}
                onChange={onStartTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <StyledField
                label="Ends"
                type="datetime-local"
                defaultValue={endTime?.toString()}
                onChange={onEndTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DoubleColGrid>
            <StyledField
              multiline
              label="Description"
              value={description}
              onChange={onDescriptionChange}
            />
          </FormWrapper>

          <Heading4>Limited collector categories</Heading4>

          <BuyerCategorySelection>
            <Chip active={subscribersAllowed} onClick={toggleAllowSubs}>
              SUBSCRIBERS
            </Chip>
            <Chip active={followersAllowed} onClick={toggleAllowFollowers}>
              FOLLOWERS
            </Chip>
          </BuyerCategorySelection>

          <ModalFooter>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={createMint}>Create</PrimaryButton>
          </ModalFooter>
        </SettingsWrapper>
      </StyledModal>
    </Modal>
  );
};

export default compose<React.FC<MintModalProps> & ComposeProps>(
  connect((state: StoreState) => ({}), {
    mintMyClip,
  })
)(MintModal);
