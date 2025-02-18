import type { BarOptions } from "./types"

import { Plot } from "../core"
import { DEFAULT_OPTIONS } from "./constants"

export class Bar extends Plot<BarOptions> {
  public static getDefaultOptions(): Partial<BarOptions> {
    return DEFAULT_OPTIONS;
  }

  public readonly type: string = "Bar"

  protected getDefaultOptions() {
    return Bar.getDefaultOptions();
  }
}