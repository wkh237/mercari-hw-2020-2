import React from "react";
import styled from "styled-components";

export const meta: ElementMeta = {
  type: "text",
  percentage: 7,
  position: "any",
  inputs: ["text"],
  keywords: [['$len:2:2', '実質']],
};

export const defaultProps: ElementPropDesciptor = {
  color: "$foreground",
  values: ["実質"],
};

const VertTextA = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color}>
    {values[0].split("").map((s, i) => (
      <div key={i}>{s}</div>
    ))}
  </StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 34px;
  line-height: 34px;
  font-weight: bolder;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  > div {
    width: 100%;
    text-align: center;
  }
`;

export default VertTextA;
