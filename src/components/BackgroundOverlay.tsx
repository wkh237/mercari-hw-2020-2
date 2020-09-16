import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import BackgroundDecoration from './BackgroundDecoration';
import { BackgroundOverlays } from "../utils/assets";
import { getRandomInt, shouldRenderWithChance } from "../utils/random";

const StyledSvg = styled(SVG)<{ color?: string; transform?: { x: number, y: number }; }>`
  position: absolute;
  left: 0;
  top: 0;
  fill: ${(props) => props.color};
  path {
    transform: ${(props) => `translate(${props.transform!.y}px, ${props.transform!.x}px)` };
  };
`;

interface Props {
  color?: string;
}

const verticalTransformRange = [5, 20]
const horiztonalTransformRange = [-50, 50]

export default ({ color }: Props) => {
  const index = getRandomInt(0, BackgroundOverlays.length);
  const svg = BackgroundOverlays[index].src;
  const defaultTransform = BackgroundOverlays[index].defaultTransform;
  const transform = {
    x: defaultTransform.x + getRandomInt(horiztonalTransformRange[0], horiztonalTransformRange[1]),
    y: defaultTransform.y + getRandomInt(verticalTransformRange[0], verticalTransformRange[1])
  }
  return shouldRenderWithChance(0.5) ? <StyledSvg src={svg} color={color} transform={transform} /> : <BackgroundDecoration color={color} />;
};
