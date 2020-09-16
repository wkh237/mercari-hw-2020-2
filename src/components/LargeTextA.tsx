import React from "react";
import styled from "styled-components";

export const meta: ElementMeta = {
  type: "text",
  percentage: 47,
  position: "any",
  inputs: ["text", "text"]
};

export const defaultProps: ElementPropDesciptor = {
  color: "$foreground",
  values: ["お買い物上手"]
};

const LargeTextA = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color}>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 45px;
  padding: 0px 4px;
  font-weight: bolder;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`;

export default LargeTextA;
