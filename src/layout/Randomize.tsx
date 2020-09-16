import React from "react";
import Elements from "../components";
import shuffle from "../utils/shuffle";
import styled from "styled-components";
import DecorationOverlay from "../components/DecorationOverlay";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { definedThemes } from '../utils/colors';
import { shouldRenderWithChance } from '../utils/random';

interface RandomLayoutProps {
  border: BannerBorderType;
  colors: BannerColors;
  elements: Array<{ id: keyof typeof Elements; props: any }>;
}

type ElementKey = keyof typeof Elements;

const DynamicLayout = ({ border, colors, elements }: RandomLayoutProps) => {
  const replaceColorToken = (token: string) => {
    if (token?.startsWith('$')) {
      // @ts-ignore
      return colors[token.substr(1)] || colors.primary;
    }
    return token;
  };
  console.log(border);
  return (
    <StyledWrapper>
      <StyledContainer color={colors.primary} border={colors.border} background={colors.background} borderType={border}>
      { shouldRenderWithChance(0.3) && <DecorationOverlay />}
      { shouldRenderWithChance(0.4) && <BackgroundOverlay color={colors.secondary} /> }
        {elements.map((el, i) => {
          const elementDef = Elements[el.id];
          const ElementClass = elementDef.default;
          const props = {
            ...elementDef.defaultProps,
            hasBorder: border,
            color: replaceColorToken(elementDef.defaultProps.color),
            colors: elementDef.defaultProps.colors
              ? elementDef.defaultProps.colors.map(replaceColorToken)
              : [colors.primary, colors.secondary, colors.foreground, colors.background],
          };
          return <ElementClass key={i} {...props} />;
        })}
      </StyledContainer>
    </StyledWrapper>
  );
};

interface StyledContainerProps {
  color: string;
  background: string;
  border: string;
  borderType: BannerBorderType;
}

const StyledWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  max-height: 100px;
  min-height: 100px;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.background};
  border: ${(props) => (props.borderType ? `4px ${props.borderType} ${props.border}` : 'none')};
`;

export default () => {
  const combinations: Array<ElementKey[]> = [];
  let maxIteration = 10000;
  let i = 0;
  const ids = shuffle(Object.keys(Elements));

  const findMinAndCanBeLast = (ids: string[]) => {
    let min = 100;
    for (let id of ids) {
      const meta = Elements[id].meta;
      if (meta.percentage < min && meta.position !== 'right' && meta.position !== 'center') {
        min = meta.percentage;
      }
    }
    return min;
  };

  const findCombinations = (availableElementIds: ElementKey[], current: ElementKey[], space: number) => {
    i++;
    if (i > maxIteration) return;
    const matched: string[] = [];
    const remained = [...availableElementIds];
    for (let id of availableElementIds) {
      remained.pop();
      const isFirst = current.length === 0;
      const el = Elements[id];
      const size = el.meta.percentage;
      const isLast = space - size <= findMinAndCanBeLast(remained);
      const isCenter = !isLast && !isFirst;
      if (
        (isFirst && el.meta.position === 'right') ||
        (isLast && el.meta.position === 'left') ||
        ((isFirst || isLast) && el.meta.position === 'center') ||
        (isCenter && el.meta.position !== 'center' && el.meta.position !== 'any')
      ) {
        continue;
      }
      // found matched
      if (space - size >= 0) {
        if (matched.indexOf(id) !== -1 && el.meta.type === 'point') {
          // no op
        }
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
          space - Elements[id].meta.percentage,
        );
      });
    }
  };
  findCombinations(ids, [], 100);
  console.log(`${combinations.length} combinations (${maxIteration} iterations)`);
  const banners = definedThemes.map((theme, i) => {
    const n = i * ~~(combinations.length / 10);
    let borderType: BannerBorderType = '';
    let rseed = Math.random();
    if (rseed < 0.2) borderType = '';
    else if (rseed < 0.4) borderType = 'dotted';
    else if (rseed < 0.6) borderType = 'dashed';
    else if (rseed < 0.8) borderType = 'solid';
    else borderType = 'solid';
    return (
      <DynamicLayout
        key={i}
        border={borderType}
        colors={theme(borderType)}
        elements={combinations[n].map((id) => ({
          id,
          props: {},
        }))}
      />
    );
  });
  return <>{banners}</>;
};
