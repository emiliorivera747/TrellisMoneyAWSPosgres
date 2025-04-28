import { LinePayload } from "@/types/graphs";

export const checkLinePayloads = (LinePayloads: LinePayload[]) => {
  
  if (!LinePayloads || LinePayloads?.length === 0) return false;

  let hasData = true;
  for (const linePayload of LinePayloads) {
    if (linePayload?.lineData?.length === 0) {
      hasData = false;
      break;
    }
  }

  if (hasData === false) return false;

  return true;
};
