import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, extend, stdlib } from '@antv/g2';

export const Chart = extend(Runtime, { ...stdlib(), ...plotlib() });
