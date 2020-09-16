import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";

export const meta: ElementMeta = {
  type: "text",
  percentage: 14.5,
  position: "any",
  inputs: ["text", "text"]
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$background', '$secondary'],
  values: ["出品", "するだけで"]
};

const StackTextBigSmallA = ({
  colors,
  values,
  singleColor
}: {
  values: string[];
  colors: string[];
  singleColor?: boolean;
}) => {
  const [background, secondary] = colors || [];
  let textColor = tinycolor(secondary).lighten(15).desaturate(40);
  if (tinycolor.readability(textColor, background) < 5) {
    textColor.darken(10);
  }
  return (
    <StyledContainer color={textColor.toHexString()}>
      <StyledBlock>{values[0]}</StyledBlock>
      <StyledBlock>{values[1]}</StyledBlock>
    </StyledContainer>
  );
};

const fontColorGen = (baseColor: string) => {
  const color = tinycolor(baseColor).lighten(15).desaturate(40).toHexString();
  return color;
};

const StyledBlock = styled.div`
  position: relative;
  background-size: 100% 20%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StyledContainer = styled.div<{
  color: string;
}>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex: 1;
  justify-content: center;
  align-self: center;
  line-height: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
  padding: 4px;
  div:nth-child(1) {
    text-align: center;
    font-size: 2.5em;
    color: ${(props) => props.color};
    line-height: 100%;
  }
  div:nth-child(2) {
    text-align: center;
    font-size: 1em;
    color: ${(props) => fontColorGen(props.color)};
  }
  > div {
    position: relative;
    font-size: 20px;
    white-space: nowrap;
  }
`;

export default StackTextBigSmallA;
