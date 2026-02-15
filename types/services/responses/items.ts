import { ApiResponse } from "@/types/services/responses/api-responses";
import { HouseholdMember, Item } from "@/drizzle/schema";

/**
 * Represents an item with associated household member information.
 * @interface ItemWithMembers
 */
interface ItemWithMembers {
  /**
   * The item associated with this entry.
   * @type {Item}
   * @memberof ItemWithMembers
   */
  item: Item;
  /**
   * The household member associated with this item.
   * @type {HouseholdMember}
   * @memberof ItemWithMembers
   */
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
