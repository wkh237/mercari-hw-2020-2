import tinycolor from 'tinycolor2';

export const getThemeFromColor = (baseColor: string, hasBorder: boolean) => {
  const backgroundColor = hasBorder ? tinycolor(baseColor).lighten(35).toHexString() : baseColor;
  if (!tinycolor.isReadable(baseColor, backgroundColor)) {
    // baseColor = tinycolor(baseColor).darken(18).toHexString();
  }
  // generate colors
  const triadColors = tinycolor(baseColor)
    .triad()
    .map((s) => s.toHex8String());
  // create color combination
  const colors = {
    primary: baseColor,
    border: hasBorder ? baseColor : '',
    secondary: triadColors[2],
    foreground: hasBorder ? baseColor : '#fff',
    background: backgroundColor,
  };
  return colors;
};
