import React from "react";
import styled from "styled-components";

const LeftCircleA = ({
  color,
  values
}: {
  color: string;
  values: string[];
}) => (
  <StyledContainer color="white" bg={color}>
    <StyledSVG height="25" width="30">
      <path fill={color} d="M 0 5 L 25 3 Q 15 20 0 20Z" />
    </StyledSVG>
    {values.map((s, i) => (
      <div key={i}>{s}</div>
    ))}
  </StyledContainer>
);

export const defaultProps: ElementPropDesciptor = {
  color: "$primary",
  values: ["れーディス", "HOT", "アイテム"],
  keywords: [['$len']]
};

export const meta: ElementMeta = {
  type: "text",
  percentage: 20,
  position: "left",
  inputs: ["text", "text", "text"]
};

const StyledSVG = styled.svg`
  position: absolute;
  right: -2%;
  z-index: 2;
  top: 60%;
`;

const StyledContainer = styled.div<{ color: string; bg: string }>`
  display: flex;
  flex-direction: column;
  line-height: 27px;
  max-width: ${meta.percentage + 1.5}%;
  min-width: ${meta.percentage + 1.5}%;
  flex: ${meta.percentage};
  justify-content: center;
  position: relative;
  color: ${(props) => props.color || "white"};
  padding: 2px 6px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  > div:nth-child(2) {
    font-size: 16px;
    letter-spacing: 1.5px;
    font-weight: bold;
  }
  > div:nth-child(3) {
    font-size: 36px;
    letter-spacing: 3px;
    font-weight: bold;
  }
  > div:nth-child(4) {
    font-size: 18px;
    letter-spacing: 3.3px;
    font-weight: bold;
  }
  > div {
    white-space: nowrap;
    z-index: 2;
  }
  &::before {
    background-color: ${(props) => props.bg};
    position: absolute;
    height: 200%;
    width: 150%;
    left: -62%;
    top: -50%;
    z-index: 1;
    border-radius: 100%;
    content: "";
  }
`;

export default LeftCircleA;
