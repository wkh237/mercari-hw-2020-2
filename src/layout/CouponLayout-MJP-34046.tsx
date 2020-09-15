import React from "react";
import LeftRecA, { meta as LeftRecAAMeta } from "../components/LeftRecA";
import StackTextSmallA, {
  meta as StackTextSmallAMeta
} from "../components/StackTextSmallA";
import CuttingEdge from "../components/CuttingEdge";
import styled from "styled-components";
import tinycolor from "tinycolor2";

// source https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2019/08/MJP-34046/banner_3.png

const MJP34046 = ({ color, element, overlay }: Layout) => {
  const textColor = tinycolor(color[3]).darken(5).desaturate(25).toHexString();
  return (
    <StyledContainer color={color[0]}>
      {overlay && <StyledOverlay src={overlay} />}
      <StackTextSmallA
        values={element[1].values}
        color={textColor}
        singleColor
      />
      <CuttingEdge color={color[0]} />
    </StyledContainer>
  );
};

const StyledOverlay = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  height: 100%;
  max-height: 100%;
  background-color: ${(props) => props.color + "30"};
  border: 4px solid ${(props) => props.color};
`;

///// FOR DEBUGGING
const baseColor = "#F63231";
const colors = tinycolor(baseColor)
  .tetrad()
  .map((c) => c.toHexString());
export default () => (
  <MJP34046
    overlay=""
    color={[baseColor, ...colors]}
    couponPos="left"
    element={[
      {
        type: "text",
        position: "left",
        values: ["新規登錄者", "限定"]
      },
      {
        type: "text",
        position: "left",
        values: ["出品", "するだけで"]
      },
      {
        type: "pointYen",
        position: "left",
        values: ["最大", "1,000"]
      }
    ]}
  />
);
