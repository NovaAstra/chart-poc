import EE from '@antv/event-emitter';

import type { G2Chart } from './chart';


export abstract class Plot extends EE {
  public chart: G2Chart;

  public render() {

  }

  public destroy() {
    this.chart.destroy();
  }
}