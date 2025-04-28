import { LinePayload } from "@/types/graphs";

export const checkLinePayloads = (LinePayloads: LinePayload[]) => {
  
  if (!LinePayloads || LinePayloads?.length === 0) return false;

  const hasData = LinePayloads.some((line) => line?.lineData?.length > 0);

  if (!hasData) return false;

  return true;
};
