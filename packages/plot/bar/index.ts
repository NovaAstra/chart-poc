import type { BarOptions } from "./type"

import { Plot } from "../../core"
import { BarAdapter } from "./adapter"

export class Bar extends Plot<BarOptions> {
  public static getDefaultOptions(): Partial<BarOptions> {
    return {}
  }

  protected getDefaultOptions() {
    return Bar.getDefaultOptions()
  }

  public constructor(options: BarOptions) {
    super(options, new BarAdapter())
  }
}