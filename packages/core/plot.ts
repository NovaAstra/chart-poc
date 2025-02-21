import type { G2Chart, G2Spec, G2Options } from "../type"

import EE from '@antv/event-emitter';
import { pick } from "lodash-es"
import { Chart } from "./chart"
import { CHART_OPTIONS } from "./constants"

export abstract class Plot<
  Options extends G2Options = G2Options,
  Spec extends G2Spec = G2Spec
> extends EE {
  public readonly container: HTMLElement;

  public chart: G2Chart;

  public options: Options;

  private createG2() {
    this.chart = new Chart(this.getChartOptions());
  }

  private getChartOptions() {
    return {
      ...pick(this.options, CHART_OPTIONS),
      container: this.container
    }
  }

  public render(options?: Spec) {
    this.chart.options(options)

    this.chart.render()
  }

  public constructor(container: string | HTMLElement, options?: Options) {
    super();
    this.container = typeof container === 'string' ? document.getElementById(container) : container;

    this.createG2()
  }
}