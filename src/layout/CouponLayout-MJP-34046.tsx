import React from "react";
import LeftRecA, { meta as LeftRecAAMeta } from "../components/LeftRecA";
import StackTextSmallA, {
  meta as StackTextSmallAMeta
} from "../components/StackTextSmallA";
import styled from "styled-components";
import tinycolor from "tinycolor2";

// source https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2019/08/MJP-34046/banner_3.png

const MJP34046 = ({ color, couponPos, element, overlay }: Layout) => {
  const textColor = tinycolor(color[3]).darken(5).desaturate(25).toHexString();
  return (
    <StyledContainer color={color[0]}>
      {overlay && <StyledOverlay src={overlay} />}
      <StyledCuttingEdge color={color[0]} couponPos={couponPos}>
        <div />
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <div />
      </StyledCuttingEdge>
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

const StyledCuttingEdge = styled.div<{
  couponPos: "left" | "right" | undefined;
  color: string;
}>`
  position: absolute;
  right: ${(props) => (props.couponPos === "left" ? "" : "20%")};
  left: ${(props) => (props.couponPos === "left" ? "20%" : "")};
  height: 100%;
  display: flex;
  justify-content: space-around;
  > ul {
    padding-inline-start: 20px;
    color: #fff;
    li {
      margin-top: -8px;
    }
  }
  div:first-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.color};
    border-radius: 50%;
    position: absolute;
    top: -13px;
    background-color: #efefef;
    right: 20%;
  }
  div:last-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.color};
    border-radius: 50%;
    position: absolute;
    bottom: -13px;
    background-color: #efefef;
    right: 20%;
  }
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
        percentage: 20,
        position: "left",
        backgroundImage: "xx",
        values: ["新規登錄者", "限定"]
      },
      {
        type: "text",
        percentage: 20,
        position: "left",
        values: ["出品", "するだけで"],
        fonts: ["38px", "15px"]
      },
      {
        type: "pointYen",
        percentage: 20,
        position: "left",
        values: ["最大", "1,000", "GET!"]
      }
    ]}
  />
);
