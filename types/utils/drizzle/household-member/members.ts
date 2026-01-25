import { householdRole } from "@/drizzle/schema";

/**
 * Parameters for checking household permissions.
 * @export
 * @typedef {Object} HasHouseholdPermission
 */
export type HasHouseholdPermission = {
  /**
   * The user ID to check permissions for.
   * @type {string}
   * @memberof HasHouseholdPermission
   */
  userId: string;

  /**
   * The household ID to check permissions against.
   * @type {string}
   * @memberof HasHouseholdPermission
   */
  householdId: string;

  /**
   * Optional array of allowed roles for permission check.
   * @type {(typeof householdRole.enumValues)[number][]}
   * @memberof HasHouseholdPermission
   */
  allowedRoles?: (typeof householdRole.enumValues)[number][];
};

/**
 * Properties for creating a new household member.
 * @export
 * @typedef {Object} CreateMemberProps
 */
export type CreateMemberProps = {
  /**
   * Full name of the member.
   * @type {string}
   * @memberof CreateMemberProps
   */
  fullName: string;

  /**
   * Email address of the member.
   * @type {string}
   * @memberof CreateMemberProps
   */
  email: string;

  /**
   * The household ID the member belongs to.
   * @type {string}
   * @memberof CreateMemberProps
   */
  householdId: string;
};
