import React from "react";
import styled from "styled-components";

const imgMap = {
  star: (
    top: string,
    left: string,
    inversed: boolean,
    color = "#fff",
    size = 24
  ) => (
    <StyledSVG
      top={top}
      left={left}
      inversed={!!inversed}
      size={size}
      viewBox="0 0 169 327"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 140.5C49.2 96.1 84.5 0 84.5 0C93.3333 36.1667 119.8 114.9 155 140.5C100.2 186.9 85.1667 247.5 84.5 272C84.5 238.8 28.1667 163.667 0 140.5Z"
        fill={color}
      />
      <path
        d="M124 290.257C138.284 277.851 148.532 251 148.532 251C151.097 261.105 158.781 283.104 169 290.257C153.09 303.222 148.726 320.154 148.532 327C148.532 317.724 132.177 296.73 124 290.257Z"
        fill={color}
      />
    </StyledSVG>
  ),
  sakura: (
    top: string,
    left: string,
    inversed: boolean,
    color = "#fff",
    size = 24
  ) => (
    <StyledSVG
      top={top}
      left={left}
      inversed={!!inversed}
      size={size}
      viewBox="0 0 283 328"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M123 0.999989C123 8.99999 156.5 87 154 96C151.5 105 244.261 76.9536 282.5 70C255 129 185.9 254.6 141.5 285C97.1 315.4 34 327.5 34 327.5C34 327.5 9.8 332.7 1 231.5C-10 105 123 -9.00001 123 0.999989Z"
        fill={color}
      />
    </StyledSVG>
  )
};

interface Props {
  img: keyof typeof imgMap;
  top: string;
  left: string;
  inversed?: boolean;
  size?: number;
  color?: string;
}

const Decoration = ({
  img,
  top,
  left,
  inversed,
  color = "#fff",
  size = 24
}: Props) => {
  const svg = imgMap[img];
  return svg(top, left, !!inversed, color, size);
};

interface StyledSVGProps {
  top: string;
  left: string;
  inversed?: boolean;
  size: number;
}

const StyledSVG = styled.svg<StyledSVGProps>`
  position: absolute;
  opacity: 0.7;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  ${(props) =>
    props.inversed ? "transform: rotateX(180deg) rotateY(180deg)" : ""};
`;

export default Decoration;
