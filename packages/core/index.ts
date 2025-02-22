import type { Chart as G2Chart, ChartOptions } from "@antv/g2"

import EE from '@antv/event-emitter';
import { pick } from "lodash-es"
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, extend, stdlib } from '@antv/g2';

export const CHART_OPTIONS = ['renderer'] as const;

const SOURCE_ATTRIBUTE_NAME = 'data-chart-source-type';

export const Chart = extend(Runtime, { ...stdlib(), ...plotlib() });

export type Options = {
  container: string | HTMLElement;
  adaptor?: Adaptor<Options>;
}

export abstract class Adaptor<O extends Options> {
  public abstract applyOptions(plot: Plot<O>): O;
}

export abstract class Plot<O extends Options> extends EE {
  public readonly container: HTMLElement;

  public chart: G2Chart;

  private createG2() {
    if (!this.container) {
      throw Error('The container is not initialized!');
    }

    this.chart = new Chart(this.getChartOptions())
    this.container.setAttribute(SOURCE_ATTRIBUTE_NAME, 'Sphere Charts');
  }

  public render(): G2Chart {
    const { adaptor } = this.options
    const options = adaptor.applyOptions(this)

    this.chart.options(options)
    this.chart.render()

    return this.chart;
  }

  public destroy() {
    this.chart?.destroy()
  }

  private getChartOptions() {
    const options = { ...pick(this.options, CHART_OPTIONS), container: this.container }
    return options as ChartOptions
  }

  public constructor(public readonly options: O) {
    super()

    const { container } = options
    this.container = typeof container === 'string' ? document.getElementById(container) : container;

    this.createG2()
  }
}