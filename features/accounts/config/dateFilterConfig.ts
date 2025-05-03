export const dateFilterConfig = [
  {
    label: "1D",
    value: "1D",
    startData: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endData: new Date(Date.now()),
  },
  {
    label: "1W",
    value: "1W",
    startData: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endData: new Date(Date.now()),
  },
  {
    label: "1M",
    value: "1M",
    startData: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endData: new Date(Date.now()),
  },
  {
    label: "3M",
    value: "3M",
    startData: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endData: new Date(Date.now()),
  },
  {
    label: "YTD",
    value: "YTD",
    startData: new Date(new Date().getFullYear(), 0, 1),
    endData: new Date(Date.now()),
  },
  {
    label: "ALL",
    value: "ALL",
    startData: new Date(0),
    endData: new Date(Date.now()),
  },
];
