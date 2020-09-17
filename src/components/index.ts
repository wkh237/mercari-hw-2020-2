import * as CuttingEdge from './CuttingEdge';
import * as JaggedCircleText from './JaggedCircleText';
import * as LargeTextA from './LargeTextA';
import * as LargeTextB from './LargeTextB';
import * as LargeTextC from './LargeTextC';
import * as LargeTextD from './LargeTextD';
import * as LeftRecA from './LeftRecA';
import * as PointYenD from './PointYenD';
import * as StackTextBigSmallA from './StackTextBigSmallA';
import * as StackTextSmallA from './StackTextSmallA';
import * as VertTextA from './VertTextA';
import * as VertTextBubbleA from './VertTextBubbleA';
import * as ImageA from './ImageA';

interface ElementDescriptor {
  default: React.FC<any>;
  meta: ElementMeta;
  defaultProps: any;
  predict?: ValuePredictor;
}

const elements: Record<string, ElementDescriptor> = {
  CuttingEdge,
  JaggedCircleText,
  LargeTextA,
  LargeTextB,
  LargeTextC,
  LeftRecA,
  LargeTextD,
  PointYenD,
  StackTextBigSmallA,
  StackTextSmallA,
  VertTextA,
  VertTextBubbleA,
  ImageA,
};

export default elements;
