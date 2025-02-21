import type { G2Chart } from './chart';

import EE from '@antv/event-emitter';
import { Chart } from './chart';

export abstract class Plot extends EE {
  public chart: G2Chart;

  public readonly container: HTMLElement;

  public constructor(container: string | HTMLElement) {
    super()
    this.container = typeof container === 'string' ? document.getElementById(container)! : container;

    this.createG2()
  }

  private createG2() {
    this.chart = new Chart(this.getChartOptions())
  }

  private getChartOptions() {
    return {
      container: this.container,
    }
  }

  public render() {

  }

  public destroy() {
    this.chart.destroy();
  }
}