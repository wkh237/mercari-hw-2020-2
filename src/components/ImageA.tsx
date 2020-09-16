import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  percentage: 15,
  inputs: ['text'],
  position: 'any',
  type: 'image',
};

export const defaultProps: ElementPropDesciptor = {
  values: [require('../assets/imgs/mercari-box.png')],
};

const ImageA = ({ values }: ElementPropDesciptor) => {
  return <StyledImage src={values[0]} />;
};

const StyledImage = styled.img`
  height: calc(100% - 20px);
  width: 15%;
`;

export default ImageA;
