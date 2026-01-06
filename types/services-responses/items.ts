import { ItemWithMembers } from "@/types/prisma";
import { ApiResponse } from "@/types/api-responses";

export interface GetItemsResponse
  extends ApiResponse<{ items: ItemWithMembers[] }> {}
