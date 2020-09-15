import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { Decorations } from "../utils/assets";

const StyledSvg = styled(SVG)<{ top?: number; left?: number; rotate?: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: rotate(${(props) => props.rotate || 0}deg);
`;

interface Props {
  svg: string;
  color?: string;
  transform?: string;
}

const horizontalRange = [0, 600];
const topVerticalRange = [-5, 5];
const bottomVerticalRange = [95, 105];
const imageSizeRange = [30, 70];
const rotationRange = [-90, 90];

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

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

export default () => {
  const arr = positions(4);
  return (
    <>
      {arr.map(({ left, top }, index) => {
        const size = getRandomInt(imageSizeRange[0], imageSizeRange[1]);
        const rotate = getRandomInt(rotationRange[0], rotationRange[1]);
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
