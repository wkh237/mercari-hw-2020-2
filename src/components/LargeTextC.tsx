import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 25,
  position: 'any',
  inputs: ['text'],
  keywords: [['$len:2:2', 'タダ', 'おまけ', 'フリー', '0', '０', '!', '！']],
};

export const defaultProps: ElementPropDesciptor = {
  color: '$foreground',
  values: ['無料'],
};

const LargeTextC = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color}>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 68px;
  padding: 0px 4px;
  letter-spacing: -2px;
  font-weight: bolder;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;
`;

export default LargeTextC;
