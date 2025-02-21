import type { Mark, Composition, AxisComponent, LegendComponent } from "@antv/g2"

export type Spec = (Mark | Composition | AxisComponent | LegendComponent) & {
  width?: number;
  height?: number;
  depth?: number;
  autoFit?: boolean;
}

export type Options = {

}