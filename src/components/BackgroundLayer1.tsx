import React, { useEffect, useRef } from "react";

const trianglify = require("trianglify");
const svgGenerated = trianglify({
  width: 600,
  height: 100
}).toSVG();

export default () => {
  const svg = useRef(null);
  useEffect(() => {
    if (svg.current) {
      // @ts-ignore
      svg.current.appendChild(svgGenerated);
    }
  }, []);
  return <div ref={svg} />;
};
