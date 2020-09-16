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
  values: ["かしこく", "みつけて"]
};

const StackTextSmallA = ({
  colors,
  values,
}: ElementPropDesciptor) => {
  const [background, secondary] = colors || [];
  let textColor = tinycolor(secondary).lighten(15).desaturate(40);
  if (tinycolor.readability(textColor, background) < 2) {
    textColor.darken(10)
  }
  return (
    <StyledContainer color={textColor.toHexString()}>
      <StyledBlock>{values[0]}</StyledBlock>
      <StyledBlock>{values[1]}</StyledBlock>
    </StyledContainer>
  );
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
    font-size: 20px;
    line-height: 100%;
  }
  div:nth-child(2) {
    font-size: 20px;
  }
  > div {
    position: relative;
    font-size: 20px;
    white-space: nowrap;
  }
`;

export default StackTextSmallA;
