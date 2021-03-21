import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import styled from "styled-components";
import Currency from "../core/models/Currency";

import Sale from "../core/models/Sale";
import User from "../core/models/User";
import { StoreState } from "../redux/reducer";
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

const BadgeItem = styled.div`
  position: absolute;
  top: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const ViewsItem = styled(BadgeItem)`
  left: 12px;
`;

const SerialNumberItem = styled(BadgeItem)`
  right: 12px;

  span {
    &:last-child {
      margin-left: 4px;
      color: #898989;
    }
  }
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

const Price = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: white;
`;

const ClipperName = styled.div`
  font-size: 12px;

  span {
    &:first-child {
      color: #898989;
      margin-right: 4px;
    }
  }
`;

const AllowedChips = styled.div`
  display: flex;
  flex-direction: row;
`;

const AllowedChip = styled.div`
  font-weight: 600;
  color: white;
  border: 1px solid white;
  opacity: 0.5;
  margin-right: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  letter-spacing: 0.2px;
`;

const ActionBtn = styled(Link)`
  font-size: 12px;
  color: #00ffba;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
`;

interface ComposeProps {
  currency: Currency;
  user: User;
}
interface NFTItemProps {
  sale: Sale;
}

const NFTItem: React.FC<NFTItemProps & ComposeProps> = ({
  sale,
  user,
  currency,
}) => {
  const { clip, mintingSettings, userId } = sale;
  const {
    subscribersAllowed,
    followersAllowed,
    copies,
    startingPrice,
    startTime,
    endTime,
  } = mintingSettings;
  const { title, creatorName, thumbnailUrl, viewCount } = clip;
  console.log(currency);

  const getPrice = (price = 0) => {
    if (!currency) return null;
    return `${(price * currency.ETH).toFixed(8)} ETH`;
  };

  return (
    <StyledClip>
      <ClipThumb thumbnail={thumbnailUrl}>
        <ViewsItem>{parseViewsNumber(viewCount)} views</ViewsItem>
        {/* {copies && ( */}
        <SerialNumberItem>
          <span>#1</span>
          <span>of 22{copies}</span>
        </SerialNumberItem>
        {/* )} */}
      </ClipThumb>
      <ClipMetadata>
        <AllowedChips>
          {subscribersAllowed || followersAllowed ? (
            <>
              {subscribersAllowed && <AllowedChip>SUBSCRIBERS</AllowedChip>}
              {followersAllowed && <AllowedChip>FOLLOWERS</AllowedChip>}
            </>
          ) : (
            <AllowedChip>ALL</AllowedChip>
          )}
        </AllowedChips>
        <FlexRow align="center" justify="between">
          <Title>{title}</Title>
          <Price>{getPrice(startingPrice)}</Price>
        </FlexRow>
        <FlexRow align="center" justify="between">
          <ClipperName>
            <span>Clipped by</span>
            <span>{creatorName}</span>
          </ClipperName>
          {user?.id === userId ? (
            <ActionBtn to="/profile">View</ActionBtn>
          ) : (
            <ActionBtn to="/">Place a bid</ActionBtn>
          )}
        </FlexRow>
      </ClipMetadata>
    </StyledClip>
  );
};

export default compose<React.FC<NFTItemProps> & ComposeProps>(
  connect((state: StoreState) => ({
    currency: state.currency.currency,
    user: state.auth.user,
  }))
)(NFTItem);
