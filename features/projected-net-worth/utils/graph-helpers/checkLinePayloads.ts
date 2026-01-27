import { LineSeriesConfig } from "@/types/components/admin/graphs/data";

export const checkLinePayloads = (LinePayloads: LineSeriesConfig[]) => {

  if (!LinePayloads || LinePayloads?.length === 0) return false;

  let hasData = true;
  for (const linePayload of LinePayloads) {
    if (linePayload?.data?.length === 0) {
      hasData = false;
      break;
    }
  }

  if (hasData === false) return false;

  return true;
};
