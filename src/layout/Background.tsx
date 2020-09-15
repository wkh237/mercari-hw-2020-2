import React from "react";
import DecorationOverlay from "../components/DecorationOverlay";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { BackgroundOverlays } from "../utils/assets";

export default ({ color }: { color: string }) => {
  const backgroundOverlay = BackgroundOverlays[1];
  return (
    <div>
      <BackgroundOverlay
        svg={backgroundOverlay.src}
        color={color}
        transform={`translate(${backgroundOverlay.defaultTransform.y}px, ${backgroundOverlay.defaultTransform.x}px)`}
      />
      <DecorationOverlay />
    </div>
  );
};
