import React from "react";
import DecorationSVG, { imgMap } from "../components/DecorationSVG";
import { getRandomInt } from "../utils/random";

const horizontalRange = [20, 580];
const verticalRange = [20, 80];
const imageSizeRange = [14, 18];

const positions = (num: number) => {
  const arr = [];
  const size = getRandomInt(imageSizeRange[0], imageSizeRange[1])
  for (var i = 0; i < num; i ++) {
    arr.push({
      x: getRandomInt(horizontalRange[0], horizontalRange[1]),
      y: getRandomInt(verticalRange[0], verticalRange[1]),
      size
    })
  }
  return arr;
};

export default ({ color, size }: {color?: string, size?: number}) => {
  const arr = positions( size || getRandomInt(10, 20) );
  const imgs = Object.keys(imgMap) as any;
  const index = getRandomInt(0, imgs.length);
  return <>
    {arr.map((item, i) => {
      return <DecorationSVG
        key={i}
        color={color || 'red'}
        img={imgs[index]}
        top={`${item.y}px`}
        left={`${item.x}px`}
        size={item.size}
      />
    })}
  </>
};
