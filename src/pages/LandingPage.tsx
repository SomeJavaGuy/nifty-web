import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StoreState } from "../redux/reducer";
import styled from "styled-components";
import StreamerItem from "../components/StreamerItem";
import { fetchFeatured } from "../redux/modules/sales";
import { AsyncAction } from "../redux/middleware/asyncMiddleware";
import Sale from "../core/models/Sale";
import NFTItem from "../components/NFTItem";

const StyledLandingPage = styled.main``;

const LandingBackground = styled.img`
  position: absolute;
  right: 0;
  width: 80%;
  top: 0;
  z-index: -1;
`;

const HeroSection = styled.section``;

const HeroSectionContent = styled.div`
  min-height: 500px;
  margin: 0 auto;
  max-width: 1480px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Heading1 = styled.h1`
  font-size: 48px;
  margin: 0;
  line-height: 65px;
  font-weight: bold;
`;

const Heading2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const TopStreamersSection = styled.section`
  max-width: 1480px;
  margin: 24px auto 54px;
`;

const HighLightSection = styled.section`
  max-width: 1480px;
  margin: 24px auto 54px;
`;

const SubText = styled.p``;

const StreamersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  margin: 32px 0;
`;

const FeaturedNFTWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  margin: 32px 0;
`;

const PLACEHOLDER_STREAMERS = [
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
  {
    name: "Shroud",
    thumbnail:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png",
    highlights: 180,
  },
];

interface LandingPageProps {
  featuredSales: Array<Sale>;
  fetchFeatured: () => Promise<AsyncAction>;
}

const LandingPage: React.FC<LandingPageProps> = ({
  featuredSales,
  fetchFeatured,
}) => {
  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <StyledLandingPage>
      <HeroSection>
        <LandingBackground src="/landing-bg.png" alt="Hero Image" />
        <HeroSectionContent>
          <Heading1>
            Claim your Achievment
            <br />
            Game for Benifits exclusive!
          </Heading1>
          <SubText>
            Increase your Account by using special features and
            <br />
            promos from Achievment.
          </SubText>
        </HeroSectionContent>
      </HeroSection>
      <TopStreamersSection>
        <Heading2>TOP STREAMERS</Heading2>
        <StreamersWrapper>
          {PLACEHOLDER_STREAMERS.map((streamer, index) => (
            <StreamerItem
              key={index}
              name={streamer.name}
              thumbnail={streamer.thumbnail}
              highlights={streamer.highlights}
            />
          ))}
        </StreamersWrapper>
      </TopStreamersSection>
      <HighLightSection>
        <Heading2>Freshly minted highlights</Heading2>
        <FeaturedNFTWrapper>
          {featuredSales.map((sale) => (
            <NFTItem sale={sale} />
          ))}
        </FeaturedNFTWrapper>
      </HighLightSection>
    </StyledLandingPage>
  );
};

export default compose<React.FC & LandingPageProps>(
  connect(
    (state: StoreState) => ({
      featuredSales: state.sales.featuredSales,
    }),
    {
      fetchFeatured,
    }
  )
)(LandingPage);
