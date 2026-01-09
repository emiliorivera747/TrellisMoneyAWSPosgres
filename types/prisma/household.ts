import { Prisma } from "@/app/generated/prisma/client";

/**
 * Represents a Household entity with optional related data included.
 *
 * This type is generated using the Prisma client and includes optional
 * relations such as members, accounts, holdings, and securities.
 *
 * @typedef {Object} Household
 * @property {boolean} [members] - Indicates whether household members are included.
 * @property {boolean} [accounts] - Indicates whether household accounts are included.
 * @property {boolean} [holdings] - Indicates whether household holdings are included.
 * @property {boolean} [securities] - Indicates whether household securities are included.
 *
 * @see {@link Prisma.HouseholdGetPayload} for more details on the payload structure.
 *
 * @import { Prisma } from "@/app/generated/prisma/client";
 */
export type Household = Prisma.HouseholdGetPayload<{
    include: {
      members?: true;
      accounts?: true;
      holdings?: true;
      securities?: true;
    };
  }>;