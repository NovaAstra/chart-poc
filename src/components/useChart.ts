import type { Ref } from "vue"

import { ref } from "vue";

export function useChart<T, U>(chart: T, config: U) {
  const container = ref(null) as unknown as Ref<HTMLElement>

  const toDataURL = (type = 'image/png', encoderOptions?: number) => {
    const canvas = container.value?.getElementsByTagName('canvas')[0];
    return canvas?.toDataURL(type, encoderOptions);
  };

  const downloadImage = (name = 'download', type = 'image/png', encoderOptions?: number): string => {
    let imageName = name;
    if (name.indexOf('.') === -1) {
      imageName = `${name}.${type.split('/')[1]}`;
    }
    const base64 = toDataURL(type, encoderOptions);
    let a: HTMLAnchorElement | null = document.createElement('a');
    a.href = base64;
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    a = null;
    return imageName;
  };

  return {
    container
  }
}