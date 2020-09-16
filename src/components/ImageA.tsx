import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  percentage: 15,
  inputs: ['text'],
  position: 'any',
  type: 'image',
};

export const defaultProps: ElementPropDesciptor = {
  values: ['https://i.pinimg.com/originals/2d/41/bb/2d41bb997e38a68affc15ad38daf4ae3.png'],
};

const ImageA = ({ values }: ElementPropDesciptor) => {
  return <StyledImage src={values[0]} />;
};

const StyledImage = styled.img`
  height: calc(100% - 20px);
  width: 15%;
`;

export default ImageA;
