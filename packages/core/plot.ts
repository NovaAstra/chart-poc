import type { G2Chart } from './chart';
import type { Options, Spec } from "../type"

import { isArray, mergeWith } from "lodash-es"
import EE from '@antv/event-emitter';
import { Chart } from './chart';

export type PickOptions = Options;

const arrayCoverage = (objValue: unknown, srcValue: unknown) => {
  if (isArray(srcValue)) {
    return srcValue;
  }
};

export const mergeWithArrayCoverage = (...args) => {
  return mergeWith(...args, arrayCoverage);
};


export abstract class Plot<O> extends EE {
  public chart: G2Chart;

  public readonly options: O;

  public readonly container: HTMLElement;

  public constructor(container: string | HTMLElement, options: O) {
    super()
    this.container = typeof container === 'string' ? document.getElementById(container)! : container;
    this.options = this.mergeOption(options);
    this.createG2()
  }

  private createG2() {
    this.chart = new Chart(this.getChartOptions())
  }

  private getChartOptions() {
    return {
      container: this.container
    }
  }

  private getSpecOptions() {
    return this.options
  }

  protected mergeOption(options: Partial<O>) {
    return mergeWithArrayCoverage({}, options);
  }

  public render() {
    this.chart.options(this.getSpecOptions() as any);

    this.chart.render()
  }

  public destroy() {
    this.chart.destroy();
  }
}