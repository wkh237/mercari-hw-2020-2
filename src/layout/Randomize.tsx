import React from "react";
import Elements from "../components";
import shuffle from "../utils/shuffle";
import styled from "styled-components";
import tinycolor from "tinycolor2";

interface RandomLayoutProps {
  border: boolean;
  colors: {
    primary: string;
    secondary: string;
    border: string;
    foreground: string;
    background: string;
  };
  elements: Array<{ id: keyof typeof Elements; props: any }>;
}

type ElementKey = keyof typeof Elements;

const DynamicLayout = ({ border, colors, elements }: RandomLayoutProps) => {
  const replaceColorToken = (token: string) => {
    if (token?.startsWith("$")) {
      // @ts-ignore
      return colors[token.substr(1)] || colors.primary;
    }
    return token;
  };
  console.log(colors);
  return (
    <StyledContainer
      color={colors.primary}
      border={border}
      background={colors.background}
    >
      {elements.map((el, i) => {
        const elementDef = Elements[el.id];
        const ElementClass = elementDef.default;
        const props = {
          ...elementDef.defaultProps,
          layoutBackground: tinycolor(colors.primary)
            .setAlpha(border ? 0.3 : 1)
            .toHex8String(),
          color: replaceColorToken(elementDef.defaultProps.color),
          colors: elementDef.defaultProps.colors
            ? elementDef.defaultProps.colors.map(replaceColorToken)
            : [
                colors.primary,
                colors.secondary,
                colors.foreground,
                colors.background
              ]
        };
        return <ElementClass key={i} {...props} />;
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{
  color: string;
  background: string;
  border: boolean;
}>`
  display: flex;
  flex-direction: row;
  position: relative;
  max-height: 100%;
  min-height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.background};
  border: ${(props) => (props.border ? `4px solid ${props.color}` : "none")};
`;

export default () => {
  // generate colors
  const triadColors = tinycolor("ff3c78")
    .triad()
    .map((s) => s.toHex8String());
  // decide if it has border
  const hasBorder = Math.random() > 0.5;
  // create color combination
  const colors = {
    primary: triadColors[0],
    border: hasBorder ? triadColors[0] : "",
    secondary: triadColors[2],
    foreground: hasBorder ? triadColors[0] : "#fff",
    background: hasBorder
      ? tinycolor(triadColors[0]).lighten(35).toHexString()
      : triadColors[0]
  };
  const combinations: Array<ElementKey[]> = [];
  let maxIteration = 300;
  let i = 0;
  const ids = shuffle(Object.keys(Elements));
  const findCombinations = (
    availableElementIds: ElementKey[],
    current: ElementKey[],
    space: number
  ) => {
    i++;
    if (i > maxIteration) return;
    const matched: string[] = [];
    for (let id of availableElementIds) {
      const isFirst = current.length === 0;
      const el = Elements[id];
      const size = el.meta.percentage;
      const isLast = space - size <= 5;
      if (
        (isFirst && el.meta.position === "right") ||
        (isLast && el.meta.position === "left") ||
        (!isFirst && !isLast && el.meta.position !== "any")
      ) {
        continue;
      }
      // found matched
      if (space - size >= 0) {
        matched.push(id);
      }
    }
    // no more elements can be put into the banner
    if (matched.length === 0 && space >= 0) {
      combinations.push(current);
    }
    // continue with next slot
    else {
      matched.forEach((id) => {
        findCombinations(
          // remove last matched one from available id list
          availableElementIds.filter((s) => s !== id),
          [...current, id],
          space - Elements[id].meta.percentage
        );
      });
    }
  };
  findCombinations(ids, [], 100);
  console.log(
    `${combinations.length} combinations (${maxIteration} iterations)`
  );
  const result = combinations[3];
  // result[0] = 'JaggedCircleText'
  // result[1] = 'VertTextBubbleA'
  console.log(
    tinycolor
      .mostReadable(colors.primary, [tinycolor(colors.primary).lighten(10)])
      .toHex8String()
  );
  return (
    <DynamicLayout
      border={hasBorder}
      colors={colors}
      elements={result.map((id) => ({
        id,
        props: {}
      }))}
    />
  );
};
