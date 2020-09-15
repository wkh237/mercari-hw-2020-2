import React from "react";
import LeftRecA, { meta as LeftRecAAMeta } from "../components/LeftRecA";
import StackTextSmallA, {
  meta as StackTextSmallAMeta
} from "../components/StackTextSmallA";
import styled from "styled-components";
import PointYen from "../components/PointYen";
import tinycolor from "tinycolor2";

// source https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2019/12/MJP-45721/banner_01.png

const MJP45721 = ({ color, element, overlay }: Layout) => {
  const textColor = tinycolor(color[3]).darken(5).desaturate(25).toHexString();
  return (
    <StyledContainer color={color[0]}>
      {overlay && <StyledOverlay src={overlay} />}
      <LeftRecA color={color[0]} values={element[0].values} />
      <StackTextSmallA
        values={element[1].values}
        color={textColor}
        fonts={element[1].fonts}
      />
      <PointYen values={element[2].values} color={textColor} />
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
const baseColor = "#B3ECD3";
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
          values: ["出品", "するだけで"],
          fonts: ["38px", "15px"]
        },
        {
          type: "pointYen",
          position: "left",
          values: ["最大", "1,000", "GET!"]
        }
      ]}
    />
  </>
);
