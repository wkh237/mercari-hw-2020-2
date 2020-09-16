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
  (_border: BannerBorderType, baseColor = tinycolor('#000')) => ({
    primary: baseColor.toHexString(),
    border: tinycolor('rgb(255,248,42)').toHexString(),
    secondary: tinycolor('rgb(9,67,87))').toHexString(),
    foreground: baseColor.toHex8String(),
    text: '#fff',
    background: tinycolor('rgb(17,175,74)').toHexString(),
  }),
];
