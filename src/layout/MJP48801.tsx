import React from "react";
import tinycolor from "tinycolor2";
import JaggedCircleText from "../components/JaggedCircleText";
import { meta as jaggedCircleMeta } from "../components/JaggedCircleText";
import VertTextBubbleA, {
  meta as VertTextBubbleAMeta
} from "../components/VertTextBubbleA";
import LargeTextB, { meta as LargeTextBMeta } from "../components/LargeTextB";
import LargeTextC, { meta as LargeTextCMeta } from "../components/LargeTextC";
import VertTextA, { meta as VertTextAMeta } from "../components/VertTextA";
import styled from "styled-components";
import DecorationSVG from "../components/DecorationSVG";

// source:
// https://github.com/kouzoh/banner.mercari.jp/blob/master/src/2020/02/MJP-48801/banner_05.jpg

export const meta: LayoutMeta = {
  element: [
    jaggedCircleMeta,
    VertTextBubbleAMeta,
    LargeTextBMeta,
    VertTextAMeta,
    LargeTextCMeta
  ]
};

const MJP48801 = ({ color, element }: Layout) => {
  const secondaryColor =
    tinycolor(color[0]).getBrightness() > 160 ? "#000" : "#fff";
  const textColor = tinycolor(secondaryColor).setAlpha(0.8).toHex8String();
  return (
    <StyledContainer color={color[0]} borderColor={textColor}>
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="6px"
        left="14%"
        size={16}
      />
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="14px"
        left="32%"
        size={16}
      />
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="4px"
        left="47%"
        size={16}
      />
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="10px"
        left="69%"
        size={16}
      />
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="90px"
        left="36%"
        size={16}
      />
      <DecorationSVG
        color={secondaryColor}
        img="sakura"
        top="90px"
        left="82%"
        size={16}
      />
      <JaggedCircleText
        color={color[0]}
        bgColor={secondaryColor}
        values={element[0].values}
      />
      <VertTextBubbleA
        color={color[0]}
        values={element[1].values}
        bgColor={textColor}
      />
      <LargeTextB values={element[2].values} color={textColor} />
      <VertTextA values={element[3].values} color={textColor} />
      <LargeTextC values={element[4].values} color={secondaryColor} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ color: string; borderColor: string }>`
  display: flex;
  border: 4px solid ${(props) => props.borderColor};
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  justify-content: space-between;
  background-color: ${(props) => props.color};
`;

///// DEBUGGING
const baseColor = tinycolor("red").toHex8String();

const props: Layout = {
  element: [
    {
      type: "text",
      values: ["このり", "3", "日"]
    },
    {
      type: "text",
      values: ["抽選で"]
    },
    {
      type: "text",
      values: ["販売手数料"]
    },
    {
      type: "text",
      values: ["実質"]
    },
    {
      type: "text",
      values: ["無料"]
    }
  ],
  color: [baseColor]
};

export default () => <MJP48801 {...props} />;
