import { ApiResponse } from "@/types/services/responses/api-responses";
import { Item } from "@/drizzle/schema";

/**
 * Represents the response structure for getting items.
 * @export
 * @interface GetItemsResponse
 */
export interface GetItemsResponse
  extends ApiResponse<{ items: Item[] }> {}
