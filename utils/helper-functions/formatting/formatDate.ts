import { timeFormat } from "@visx/vendor/d3-time-format";
export const formatDate = (date: Date) => timeFormat("%b ")(date).toUpperCase() + timeFormat("%d, %Y")(date);
