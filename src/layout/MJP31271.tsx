import React from "react";
import LeftCircleA, {
  meta as LeftCircleAMeta
} from "../components/LeftCircleA";
import StackTextSmallA, {
  meta as StackTextSmallAMeta
} from "../components/StackTextSmallA";
import LargeTextA, { meta as LargeTextAMeta } from "../components/LargeTextA";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import DecorationSVG from "../components/DecorationSVG";

// source https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2019/08/MJP-31271/banner1.png

export const meta: LayoutMeta = {
  border: 2,
  element: [
    LeftCircleAMeta,
    StackTextSmallAMeta,
    LargeTextAMeta,
    {
      type: "image",
      percentage: 21.25,
      position: "any",
      inputs: ["text"]
    }
  ]
};

const MJP31273 = ({ color, element, overlay }: Layout) => {
  const textColor = tinycolor(color[3]).darken(5).desaturate(25).toHexString();
  return (
    <StyledContainer color={color[0]}>
      <DecorationSVG img="star" top="5px" left="37%" />
      <DecorationSVG img="star" top="70%" left="60%" inversed />
      <DecorationSVG img="star" top="5px" left="82%" />
      <LeftCircleA color={color[0]} values={element[0].values} />
      <StackTextSmallA
        values={element[1].values}
        color={textColor}
        singleColor
      />
      <LargeTextA color={textColor} values={element[2].values} />
      {element[3]?.values?.[0] && <StyledImage src={element[3].values[0]} />}
    </StyledContainer>
  );
};

///// STYLED COMPONENTS

const StyledImage = styled.img`
  width: 15%;
  height: calc(100% - 20px);
`;

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
  max-height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    tinycolor(props.color).setAlpha(0.3).toHex8String()};
  border: 4px solid ${(props) => props.color};
`;

///// FOR DEBUGGING
const baseColor = "#ff3c78";
const colors = tinycolor(baseColor)
  .triad()
  .map((c) => c.toHexString());

export default () => (
  <MJP31273
    overlay=""
    color={[baseColor, ...colors]}
    element={[
      {
        type: "text",
        position: "left",
        values: ["れーディス", "HOT", "アイテム"]
      },
      {
        type: "text",
        position: "any",
        values: ["かしこく", "みつけて"]
      },
      {
        type: "text",
        position: "any",
        values: ["お買い物上手"]
      },
      {
        type: "image",
        position: "any",
        values: [
          "https://i.pinimg.com/originals/2d/41/bb/2d41bb997e38a68affc15ad38daf4ae3.png"
        ]
      }
    ]}
  />
);
