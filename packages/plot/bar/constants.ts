export const DEFAULT_OPTIONS = {
  type: "interval",
  scale: {
    y: { nice: true },
  },
  axis: {
    y: { title: false },
    x: { title: false },
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  interaction: {
    tooltip: {
      shared: true,
    },
    elementHighlight: {
      background: true,
    },
  },
}