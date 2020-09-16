import React from "react";
import DecorationOverlay from "../components/DecorationOverlay";
import BackgroundOverlay from "../components/BackgroundOverlay";

export default ({ color }: { color: string; }) => {
  return (
    <div>
      <BackgroundOverlay
        color={color}
      />
      <DecorationOverlay />
    </div>
  );
};
