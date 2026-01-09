import { Prisma } from "@/app/generated/prisma/client";

/**
 * Represents an item with expanded member information.
 * @export
 * @typedef {Prisma.ItemGetPayload<{ include: { member: true } }>} ItemWithMembers
 */
export type ItemWithMembers = Prisma.ItemGetPayload<{
  include: {
    member: true;
  };
}>;
