import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  type: 'cuttingEdge',
  percentage: 3,
  position: 'center',
  inputs: [],
  keywords: [['ポイント', 'point', '円', 'かね', 'カネ', 'クーポン', 'coupon', 'discount', 'ディスカウント']],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$border'],
  values: ['ポイント'],
};

const CuttingEdge = ({ colors = [], borderType }: ElementPropDesciptor) => {
  return (
    <StyledCuttingEdge colors={colors} dotColor={[]}>
      <div />
      <ul>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <div />
    </StyledCuttingEdge>
  );
};

const StyledCuttingEdge = styled.div<{
  colors: string[];
  dotColor: string[];
}>`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-around;
  > ul {
    padding-inline-start: 20px;
    color: ${(props) => props.dotColor[3] || '#fff'};
    li {
      margin-top: -8px;
    }
  }
  div:first-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.colors[0]};
    border-radius: 50%;
    position: absolute;
    top: -13px;
    background-color: ${(props) => props.colors[3] || '#efefef'};
    right: 20%;
  }
  div:last-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.colors[0]};
    border-radius: 50%;
    position: absolute;
    bottom: -13px;
    background-color: ${(props) => props.colors[3] || '#efefef'};
    right: 20%;
  }
`;

export default CuttingEdge;
