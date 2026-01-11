import { db } from "@/drizzle/db";
import { eq, desc } from "drizzle-orm";
import { subscription } from "@/drizzle/schema/stripe";

const getSubscriptionMinimalData = async (userId: string) => {
  const sub = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .orderBy(desc(subscription.createdAt))
    .limit(1);
  return sub[0];
};

export default getSubscriptionMinimalData;
