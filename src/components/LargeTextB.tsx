import React from "react";
import styled from "styled-components";

export const meta: ElementMeta = {
  type: "text",
  percentage: 50,
  position: "any",
  inputs: ["text", "text"]
};

export const defaultProps = {
  color: "$foreground",
  values: ["販売手数料"]
};

const LargeTextB = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color}>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 54px;
  padding: 0px 4px;
  letter-spacing: -4px;
  overflow: hidden;
  font-weight: bolder;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`;

export default LargeTextB;
