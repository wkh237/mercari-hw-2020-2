import React from "react";
import LeftRecA from "../components/LeftRecA";
import PointYenA from "../components/PointYenA";
import StackTextBigSmallA from "../components/StackTextBigSmallA";
import styled from "styled-components";
import tinycolor from "tinycolor2";

// source https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2019/12/MJP-45721/banner_01.png

const MJP45721 = ({ color, element, overlay }: Layout) => {
  return (
    <StyledContainer color={color[0]}>
      {overlay && <StyledOverlay src={overlay} />}
      <LeftRecA colors={color} values={element[0].values} />
      <StackTextBigSmallA values={element[1].values} colors={color} />
      <PointYenA values={element[2].values} colors={color} />
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
  position: relative;
  height: 100%;
  width: 600px;
  max-height: 100%;
  background-color: ${(props) => props.color + "30"};
  border: 4px solid ${(props) => props.color};
`;

///// FOR DEBUGGING
const baseColor = tinycolor("red").toHex8String();
const colors = tinycolor(baseColor)
  .tetrad()
  .map((c) => c.toHexString());
export default () => (
  <>
    <MJP45721
      overlay=""
      color={[baseColor, ...colors]}
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
          type: "point",
          position: "left",
          values: ["最大", "1,000", "GET!"]
        }
      ]}
    />
  </>
);
