import React from "react";
import styled from "styled-components";

var GeoPattern = require("geopattern");
var pattern = GeoPattern.generate("hello");
var svg = pattern.toDataUrl();

const StyledBackgroundImage = styled.div<{ url: string }>`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-image: ${(props) => props.url};
`;

export default () => {
  return <StyledBackgroundImage url={svg} />;
};
