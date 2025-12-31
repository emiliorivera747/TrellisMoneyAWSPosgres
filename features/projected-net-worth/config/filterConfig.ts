import { FilterConfig } from "@/features/projected-net-worth/types/filters";

export const filterConfig: FilterConfig[] = [
  {
    key: "withNoInflation",
    label: "Future dollars",
    svg_path: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
    color: "#66a80f",
  },
  {
    key: "withInflation",
    label: "Today's dollars",
    svg_path:
      "M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181",
    color: "#c92a2a",
  },
  {
    key: "isBoth",
    label: "Both",
    svg_path:
      "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
    color: "#4c6ef5",
  },
];



