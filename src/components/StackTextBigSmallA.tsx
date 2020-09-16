import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 14.5,
  position: 'any',
  inputs: ['text', 'text'],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$foreground', '$text'],
  values: ['出品', 'するだけで'],
};

const StackTextBigSmallA = ({ colors, values }: { values: string[]; colors: string[]; singleColor?: boolean }) => {
  const [foreground, textColor] = colors || [];
  return (
    <StyledContainer color={foreground} color2={textColor}>
      <StyledBlock>{values[0]}</StyledBlock>
      <StyledBlock>{values[1]}</StyledBlock>
    </StyledContainer>
  );
};

const StyledBlock = styled.div`
  position: relative;
  background-size: 100% 20%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StyledContainer = styled.div<{
  color: string;
  color2: string;
}>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex: 1;
  justify-content: center;
  align-self: center;
  line-height: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
  padding: 4px;
  div:nth-child(1) {
    text-align: center;
    font-size: 2.5em;
    font-weight: bolder;
    color: ${(props) => props.color};
    line-height: 100%;
  }
  div:nth-child(2) {
    text-align: center;
    font-size: 1em;
    color: ${(props) => props.color2};
  }
  > div {
    position: relative;
    font-size: 20px;
    white-space: nowrap;
  }
`;

export default StackTextBigSmallA;
