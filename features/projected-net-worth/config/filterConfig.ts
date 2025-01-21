import {FilterConfig} from "@/features/projected-net-worth/types/filters"

export const filterConfig: FilterConfig[] = [
  {
    key: "isNoInflation",
    label: "Future dollars",
    svg_path: "M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3",
  },
  {
    key: "isInflation",
    label: "Today's dollars",
    svg_path:
      "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
  },
  {
    key: "isBoth",
    label: "Both",
    svg_path:
      "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
  },
];
