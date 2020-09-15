import React from "react";
import styled from "styled-components";

export const meta: ElementMeta = {
  type: "text",
  percentage: 65,
  position: "any",
  inputs: ["text", "text", "text"]
};

export const defaultProps: BannerPropDesciptor = {
  values: ["最大", "1,000", "GET!"]
};

const StyledPointYen = styled.div<{ colors: string[] }>`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: ${(props) => props.colors[2] || "red"};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
`;

const StyledValue = styled.div`
  font-size: 60px;
  font-weight: 700;
`;

const StyledPointYenWord = styled.div`
  div:first-child {
    font-size: 32px;
    font-weight: 700;
    span:first-child {
      margin-right: 2px;
    }
  }
  div:nth-child(2) {
    font-size: 16px;
    font-weight: 700;
  }
`;

const StyledPointYenAction = styled.div`
  font-size: 50px;
  font-weight: 700;
`;

const StyledPointYenAdjective = styled.div`
  writing-mode: vertical-lr;
  font-size: 25px;
  font-weight: 700;
`;

const PointYen = ({
  values,
  colors
}: {
  values: string[];
  colors: string[];
}) => {
  const [left, amount, right] = values;
  return (
    <StyledPointYen colors={colors}>
      {left && <StyledPointYenAdjective>{left}</StyledPointYenAdjective>}
      <StyledValue>{amount}</StyledValue>
      <StyledPointYenWord>
        <div>
          <span>円</span>
          <span>分</span>
        </div>
        <div>ポイント</div>
      </StyledPointYenWord>
      {right && <StyledPointYenAction>{right}</StyledPointYenAction>}
    </StyledPointYen>
  );
};

export default PointYen;
