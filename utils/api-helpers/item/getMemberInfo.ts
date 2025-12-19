import { Item, Household, HouseholdMember } from "@/app/generated/prisma/client";

/**
 * Retrieves information about a member in a household, including their role and ownership status.
 *
 * @param item - The item object containing household and member details. 
 *               It includes the household object and its associated members.
 * @param user_id - The ID of the user to check ownership against.
 * 
 * @returns An object containing:
 * - `isAdmin`: A boolean indicating if the current member has an "ADMIN" role.
 * - `isOwner`: A boolean indicating if the user is the owner of the item.
 * - `currentMember`: The first member of the household.
 */
export const getMemberInfo = (item: Item & { household: Household & { members: HouseholdMember[] } }, user_id: String) => {
    const currentMember = item.household.members[0];
    const isOwner = item.user_id === user_id;
    const isAdmin = currentMember && currentMember.role === "ADMIN";
    return { isAdmin, isOwner, currentMember };
};
