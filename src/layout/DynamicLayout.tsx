import React from 'react';
import Elements from '../components';
import styled from 'styled-components';
import DecorationOverlay from '../components/DecorationOverlay';

import { shouldRenderWithChance } from '../utils/random';
import BackgroundOverlay from '../components/BackgroundOverlay';
import { MatchedElement } from './Randomize';

interface DynamicBannerProps {
  border: BannerBorderType;
  colors: BannerColors;
  elements: MatchedElement[];
}

const DynamicBanner = ({ border, colors, elements }: DynamicBannerProps) => {
  const replaceColorToken = (token: string) => {
    if (token?.startsWith('$')) {
      // @ts-ignore
      return colors[token.substr(1)] || colors.primary;
    }
    return token;
  };
  const elemetMeta = Elements[elements[0]?.key]?.meta;
  // for those elements has position "left" or "right" we don't need extra space
  // on each sides, otherwise give it a 1% padding
  const shouldPadLeft = elemetMeta?.position !== 'left';
  const shouldPadRight = elemetMeta?.position !== 'right';
  const addCouponDecoration = Math.random() < 0.5;
  const renderElements = [...elements];
  if (addCouponDecoration) {
    renderElements.splice(Math.floor(Math.random() * elements.length) + 1, 0, {
      key: 'CuttingEdge',
      predictedValues: null,
    });
  }
  return (
    <StyledWrapper background={colors.background}>
      {shouldRenderWithChance(0.3) && <DecorationOverlay />}
      {shouldRenderWithChance(0.7) && <BackgroundOverlay color="#ffffffa0" />}
      <StyledContainer
        color={colors.primary}
        border={colors.border}
        borderType={border}
        paddingLeft={shouldPadLeft}
        paddingRight={shouldPadRight}
      >
        {renderElements.map((el, i) => {
          const elementDef = Elements[el.key];
          const ElementClass = elementDef.default;
          const values = (el?.predictedValues?.length || -1) > 0 ? el.predictedValues : elementDef.defaultProps.values;
          const props = {
            ...elementDef.defaultProps,
            hasBorder: border,
            color: replaceColorToken(elementDef.defaultProps.color),
            colors: elementDef.defaultProps.colors
              ? elementDef.defaultProps.colors.map(replaceColorToken)
              : [colors.primary, colors.secondary, colors.foreground, colors.background],
            values,
          };
          return <ElementClass key={`${el.key}-${i}`} {...props} />;
        })}
      </StyledContainer>
    </StyledWrapper>
  );
};

interface StyledContainerProps {
  color: string;
  border: string;
  borderType: BannerBorderType;
  paddingLeft: boolean;
  paddingRight: boolean;
}

const StyledWrapper = styled.div<{ background: string }>`
  position: relative;
  background-color: ${(props) => props.background};
  max-height: 100px;
  max-width: 600px;
  overflow: hidden;
`;

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  max-height: 100px;
  min-height: 100px;
  max-width: 600px;
  min-width: 600px;
  border: ${(props) => (props.borderType ? `4px ${props.borderType} ${props.border}` : 'none')};
  padding-left: ${(props) => (props.paddingLeft ? '1%' : '0')};
  padding-right: ${(props) => (props.paddingRight ? '1%' : '0')};
`;

export default DynamicBanner;
