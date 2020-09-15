// backgrounds
import bg from "../assets/bg.svg";
import bg1 from "../assets/bg1.svg";

// decorations
import camera from "../assets/camera.svg";
import golfbag from "../assets/golfbag.svg";
import lamp from "../assets/lamp.svg";
import speaker from "../assets/speaker.svg";

export const BackgroundOverlays = [
  {
    src: bg,
    defaultTransform: {
      y: -800,
      x: -60
    }
  },
  {
    src: bg1,
    defaultTransform: {
      x: 0,
      y: 0
    }
  }
];

export const Decorations = [camera, golfbag, lamp, speaker];
