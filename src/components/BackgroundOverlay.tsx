import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";

const StyledSvg = styled(SVG)<{ color?: string; transform?: string }>`
  fill: ${(props) => props.color};
  path {
    transform: ${(props) => props.transform};
  }
`;

interface Props {
  svg: string;
  color?: string;
  transform?: string;
}

export default ({ svg, color, transform }: Props) => {
  return <StyledSvg src={svg} color={color} transform={transform} />;
};
