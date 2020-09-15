import tinycolor from "tinycolor2";

export const getThemeFromColor = (baseColor: string, hasBorder: boolean) => {
  // generate colors
  const triadColors = tinycolor(baseColor)
    .triad()
    .map((s) => s.toHex8String());
  // create color combination
  const colors = {
    primary: triadColors[0],
    border: hasBorder ? triadColors[0] : '',
    secondary: triadColors[2],
    foreground: hasBorder ? triadColors[0] : '#fff',
    background: hasBorder ? tinycolor(triadColors[0]).lighten(35).toHexString() : triadColors[0],
  };
  return colors
}