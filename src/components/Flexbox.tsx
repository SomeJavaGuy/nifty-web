import React from "react";
import styled from "styled-components";

const Positioning = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
};

type AlignAndJustifyType = "start" | "end" | "center" | "stretch" | "between";

interface StyledFlexboxProps {
  direction: "row" | "column";
  align?: AlignAndJustifyType;
  justify?: AlignAndJustifyType;
}

const StyledFlexbox = styled.div<StyledFlexboxProps>(
  ({ direction, align, justify }) => ({
    display: "flex",
    width: "100%",
    ...(direction ? { flexDirection: direction } : {}),
    ...(align ? { alignItems: Positioning[align] } : {}),
    ...(justify ? { justifyContent: Positioning[justify] } : {}),
  })
);

interface FlexBoxProps {
  align?: AlignAndJustifyType;
  justify?: AlignAndJustifyType;
}

export const FlexCol: React.FC<FlexBoxProps> = ({ children, ...opts }) => (
  <StyledFlexbox direction="column" {...opts}>
    {children}
  </StyledFlexbox>
);

export const FlexRow: React.FC<FlexBoxProps> = ({ children, ...opts }) => (
  <StyledFlexbox direction="row" {...opts}>
    {children}
  </StyledFlexbox>
);
