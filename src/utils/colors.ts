import tinycolor from 'tinycolor2';

export const definedThemes: Array<(
  border: BannerBorderType,
  baseColor?: ReturnType<typeof tinycolor>,
) => BannerColors> = [
  (border: BannerBorderType, baseColor = tinycolor('rgb(1,190,106)')) => ({
    primary: baseColor.toHexString(),
    border: border ? baseColor.toHex8String() : 'transparent',
    secondary: tinycolor('rgb(255,91,90)').toHexString(),
    foreground: border ? baseColor.toHex8String() : '#fff',
    text: '#000',
    background: border ? baseColor.lighten(35).toHexString() : baseColor.toHexString(),
  }),
  (border: BannerBorderType, baseColor = tinycolor('red')) => ({
    primary: baseColor.toHexString(),
    border: border ? baseColor.toHexString() : 'transparent',
    secondary: tinycolor('rgb(58,149,218)').toHexString(),
    foreground: border ? baseColor.toHex8String() : '#fff',
    text: '#000',
    background: border ? baseColor.lighten(35).toHexString() : baseColor.toHexString(),
  }),
  (border: BannerBorderType, baseColor = tinycolor('rgb(238,196,30)')) => ({
    primary: baseColor.toHexString(),
    border: border ? baseColor.toHexString() : 'transparent',
    secondary: tinycolor('rgb(198,1,95))').toHexString(),
    foreground: border ? baseColor.toHex8String() : '#000',
    text: '#fff',
    background: border ? baseColor.lighten(35).toHexString() : baseColor.toHexString(),
  }),
];

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
