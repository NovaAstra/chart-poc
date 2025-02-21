import { Plot } from "../../core"
import { DEFAULT_OPTIONS } from "./constants"

export class Bar extends Plot {
  public static getDefaultOptions() {
    return DEFAULT_OPTIONS
  }

  protected getDefaultOptions() {
    return Bar.getDefaultOptions()
  }
}