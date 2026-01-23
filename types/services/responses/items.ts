import { ApiResponse } from "@/types/services/responses/api-responses";
import { HouseholdMember, Item } from "@/drizzle/schema";

interface ItemWithMembers extends Item {
  member: HouseholdMember;
}

/**
 * Represents the response structure for getting items.
 * @export
 * @interface GetItemsResponse
 */
export interface GetItemsResponse
  extends ApiResponse<{
    items: ItemWithMembers[];
  }> {}
