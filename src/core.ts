import type { Chart, G2Spec, } from '@antv/g2';

import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, extend, stdlib } from '@antv/g2';
import EE from '@antv/event-emitter';

export const G2Chart = extend(Runtime, { ...stdlib(), ...plotlib() });

export type Primitive = number | string | boolean | Date;

const SOURCE_ATTRIBUTE_NAME = 'data-chart-source-type';

export abstract class Plot<O> extends EE {
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;

  /** G2 Spec */
  public options: O;

  /** G2 chart 实例 */
  public chart!: Chart;

  private createG2() {
    if (!this.container) {
      throw Error('The container is not initialized!');
    }

    this.chart = new G2Chart(this.getChartOptions());
    // 给容器增加标识，知道图表的来源区别于 G2
    this.container.setAttribute(SOURCE_ATTRIBUTE_NAME, 'Sphere Charts');
  }

  private getChartOptions() {
    return {
      container: this.container
    }
  }

  public changeData(data: any): Promise<Runtime<G2Spec>> {
    return this.chart.changeData(data);
  }

  public changeSize(width: number, height: number): Promise<Runtime<G2Spec>> {
    return this.chart.changeSize(width, height);
  }

  public destroy() {
    this.chart.destroy()
  }

  public constructor(container: string | HTMLElement, options: O) {
    super();
    this.container = typeof container === 'string' ? document.getElementById(container)! : container;

    this.options = options

    this.createG2();
  }
}


