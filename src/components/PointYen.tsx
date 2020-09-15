import React from "react";
import styled from "styled-components";

export const meta: ElementMeta = {
  type: "text",
  percentage: 63,
  position: "any",
  inputs: ["text", "text", "text", "text"]
};

const StyledPointYen = styled.div<{ color: string }>`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: ${(props) => props.color || "red"};
  display: flex;
  align-items: center;
  flex: 1;
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

const PointYen = ({ values, color }: { values: string[]; color: string }) => {
  const [left, amount, right] = values;
  return (
    <StyledPointYen color={color}>
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
