import type {
  Chart,
  ChartOptions
} from "@antv/g2"

import EE from '@antv/event-emitter';
import { pick } from "lodash-es"
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, extend, stdlib } from '@antv/g2';

export const CHART_OPTIONS = ['renderer'] as const;

const SOURCE_ATTRIBUTE_NAME = 'data-chart-source-type';

export const G2Chart = extend(Runtime, { ...stdlib(), ...plotlib() });

export type Options = {
  container: string | HTMLElement;
}

const override = (options: Options) => options

export abstract class Adaptor<O extends Options> {
  public abstract applyOptions(plot: Plot<O>): O;
}

export abstract class Plot<O extends Options> extends EE {
  public readonly options: O;

  public readonly container: HTMLElement;

  public readonly adaptor: Adaptor<O>;

  public chart: Chart;

  private createG2() {
    if (!this.container) {
      throw Error('The container is not initialized!');
    }

    this.chart = new G2Chart(this.getChartOptions())
    this.container.setAttribute(SOURCE_ATTRIBUTE_NAME, 'Sphere Charts');
  }

  public render(): Chart {
    const options = this.adaptor.applyOptions(this)

    this.chart.options(options)
    this.chart.render()

    return this.chart;
  }

  public destroy(): Chart {
    this.chart?.destroy()

    return this.chart;
  }

  private getChartOptions() {
    const options = { ...pick(this.options, CHART_OPTIONS), container: this.container }
    return options as ChartOptions
  }

  protected abstract getDefaultOptions(): Partial<Options>;

  public constructor(options: O, adaptor?: Adaptor<O>) {
    super()

    const { container } = options
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = override(options) as O
    this.adaptor = adaptor

    this.createG2()
  }
}