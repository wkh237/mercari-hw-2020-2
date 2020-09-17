import React from 'react';
import styled from 'styled-components';
import { predictFirstMatchText } from '../utils/predict';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 50,
  position: 'any',
  inputs: ['text', 'text'],
  keywords: [['$len:5:4']],
};

export const defaultProps: ElementPropDesciptor = {
  color: '$foreground',
  values: ['販売手数料'],
};

export const predict: ValuePredictor = predictFirstMatchText;

const LargeTextB = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color} contentEditable>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 54px;
  padding: 0px 4px;
  letter-spacing: -4px;
  overflow: hidden;
  font-weight: bolder;
  white-space: nowrap;
  font-family: CPFont;
`;

export default LargeTextB;
