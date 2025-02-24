import { Plot } from './../core';

import type { Options } from './../core';

export class Factory extends Plot<Options> {
  public static getDefaultOptions(): Partial<Options> {
    return {
      type: 'view',
      children: [{ type: 'line' }],
    };
  }

  protected getDefaultOptions() {
    return Factory.getDefaultOptions();
  }

  public constructor(options: Options) {
    super(options)
  }
}
