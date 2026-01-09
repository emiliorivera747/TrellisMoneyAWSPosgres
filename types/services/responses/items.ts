import { ItemWithMembers } from "@/types/prisma/prisma";
import { ApiResponse } from "@/types/services/responses/api-responses";

/**
 * Represents the response structure for getting items.
 * @export
 * @interface GetItemsResponse
 */
export interface GetItemsResponse
  extends ApiResponse<{ items: ItemWithMembers[] }> {}
