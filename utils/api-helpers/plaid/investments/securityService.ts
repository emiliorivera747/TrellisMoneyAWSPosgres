import { prisma } from "@/lib/prisma";
import { Security } from "plaid";

/**
 * Compares the securities from plaid with the securities in the database
 * and returns the securities in the database.
 *
 * @param securities
 */
export const getExistingSecurities = async (securities: Security[]) => {
  await prisma.security.findMany({
    where: {
      security_id: { in: securities.map((security) => security.security_id) },
    },
    select: { security_id: true, close_price: true },
  });
};
