// type of input field
type LayoutInput = "text" | "number";

interface BaseElement {
  percentage: number;
  position?: "left" | "right" | "any" | "center";
  inputs: LayoutInput[];
  values: string[];
}

type LayoutElement =
  | ({
      type: "image";
    } & BaseElement)
  | ({
      type: "text";
      backgroundImage?: string;
    } & BaseElement)
  | ({
      type: "point";
    } & BaseElement)
  | ({
    type: "cuttingEdge";
  } & BaseElement)

type ElementMeta = Omit<LayoutElement, "values"> & { position: BaseElement['position'] };

type LayoutMeta = {
  // width of border
  border?: number;
  overlay?: string;
  hasBorder?: boolean;
  // omit values because it's a metadata
  element: ElementMeta[];
};

interface ElementPropDesciptor {
  colors?: string[];
  color?: string;
  hasBorder?: boolean;
  values: string[];
}

interface Layout {
  color: string[];
  // width of border
  border?: number;
  overlay?: string;
  element: Omit<LayoutElement, "inputs" | "percentage">[];

  // coupon pos
  couponPos?: "left" | "right";
}
