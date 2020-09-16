import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { Decorations } from "../utils/assets";
import { getRandomInt } from "../utils/random";

const StyledSvg = styled(SVG)<{ top?: number; left?: number; rotate?: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: rotate(${(props) => props.rotate || 0}deg);
  z-index: 0;
`;

interface Props {
  decorationCount?: number;
}

const horizontalRange = [0, 600];
const topVerticalRange = [-20, -5];
const bottomVerticalRange = [60, 80];
const imageSizeRange = [30, 40];
const rotationRange = [-90, 90];

const positions = (num: number) => {
  const widthDouble = 600 * 2;
  const increment = Math.floor(widthDouble / num);
  const incrementRange = [increment - 100, increment + 100];
  let left = getRandomInt(horizontalRange[0], horizontalRange[1]);
  const arr = [];
  for (var i = 0; i < num; i++) {
    let top = getRandomInt(topVerticalRange[0], topVerticalRange[1]);
    if (left > 600 && left <= 1200) {
      top = getRandomInt(bottomVerticalRange[0], bottomVerticalRange[1]);
    }
    if (left > 1200) {
      left -= 600;
    }
    arr.push({ left: left > 600 ? left - 600 : left, top });
    left += getRandomInt(incrementRange[0], incrementRange[1]);
  }
  return arr;
};

export default ({ decorationCount }: Props) => {
  const arr = positions(decorationCount || getRandomInt(0, 6));
  return (
    <>
      {arr.map(({ left, top }) => {
        const size = getRandomInt(imageSizeRange[0], imageSizeRange[1]);
        const rotate = getRandomInt(rotationRange[0], rotationRange[1]);
        const index = getRandomInt(0, Decorations.length);
        return (
          <StyledSvg
            src={Decorations[index]}
            rotate={rotate}
            height={size}
            width={size}
            left={left}
            top={top}
          />
        );
      })}
    </>
  );
};
