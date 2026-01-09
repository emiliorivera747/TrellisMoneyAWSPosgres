import { ItemWithMembers } from "@/types/prisma/prisma";
import { ApiResponse } from "@/types/services/responses/api-responses";

export interface GetItemsResponse
  extends ApiResponse<{ items: ItemWithMembers[] }> {}
