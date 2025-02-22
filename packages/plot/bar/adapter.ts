import type { BarOptions } from "./type"
import type { Plot } from "../../core"

import { Adaptor } from "../../core"

export class BarAdapter extends Adaptor<BarOptions> {
  public applyOptions(plot: Plot<BarOptions>) {
    return plot;
  }
}