import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";

export const meta: ElementMeta = {
  type: "text",
  percentage: 14.5,
  position: "any",
  inputs: ["text", "text"]
};

const StackTextSmallA = ({
  color,
  values,
  fonts = [],
  singleColor
}: {
  values: string[];
  color: string;
  fonts?: string[];
  singleColor?: boolean;
}) => {
  return (
    <StyledContainer color={color} fonts={fonts} singleColor={singleColor}>
      <StyledBlock>{values[0]}</StyledBlock>
      <StyledBlock>{values[1]}</StyledBlock>
    </StyledContainer>
  );
};

const fontColorGen = (baseColor: string) => {
  const colors = tinycolor(baseColor)
    .tetrad()
    .map((c) => c.toHexString());
  return colors;
};

const underline = `data:image/svg+xml;base64,${btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M0 0 h30v30h-30 Z" fill="#ffffffa0" /></svg>'
)}`;

const StyledBlock = styled.div`
  position: relative;
  background-image: url(${underline});
  background-size: 100% 20%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StyledContainer = styled.div<{
  color: string;
  fonts: string[];
  singleColor: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex: 1;
  justify-content: center;
  color: ${(props) => props.color};
  align-self: center;
  line-height: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
  padding: 4px;
  div:nth-child(1) {
    font-size: ${(props) => props.fonts[0] || "20px"};
    color: ${(props) =>
      props.singleColor ? "initial" : fontColorGen(props.color)[1]};
    line-height: 100%;
  }
  div:nth-child(2) {
    font-size: ${(props) => props.fonts[1] || "20px"};
    color: ${(props) =>
      props.singleColor ? "initial" : fontColorGen(props.color)[3]};
  }
  > div {
    position: relative;
    font-size: 20px;
    white-space: nowrap;
  }
`;

export default StackTextSmallA;
