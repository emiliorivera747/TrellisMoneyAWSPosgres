import { householdRole } from "@/drizzle/schema";

export type HasHouseholdPermission = {
  userId: string;
  householdId: string;
  allowedRoles?: (typeof householdRole.enumValues)[number][];
};

export type CreateMemberProps = {
  name: string;
  email: string;
  householdId: string;
};
