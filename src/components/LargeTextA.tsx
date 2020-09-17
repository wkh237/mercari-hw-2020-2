import React from 'react';
import styled from 'styled-components';
import { predictFirstMatchText } from '../utils/predict';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 47,
  position: 'any',
  inputs: ['text', 'text'],
  keywords: [['$len:6:4']],
};

export const defaultProps: ElementPropDesciptor = {
  color: '$foreground',
  values: ['お買い物上手'],
};

export const predict: ValuePredictor = predictFirstMatchText;

const LargeTextA = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color} contentEditable>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 45px;
  padding: 0px 4px;
  font-weight: bolder;
  white-space: nowrap;
  font-family: Roboto;
`;

export default LargeTextA;
