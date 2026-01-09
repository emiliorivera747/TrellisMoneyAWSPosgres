import { db } from "@/src/drizzle/db";
import { eq, desc } from "drizzle-orm";
import { subscription } from "@/src/drizzle/schema";

const getSubscriptionMinimalData = async (userId: string) => {
  console.log("BEFORE QUERY", Date.now());
  const sub = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .orderBy(desc(subscription.createdAt))
    .limit(1);
  console.log("AFTER QUERY", Date.now());

  return sub[0];
};

export default getSubscriptionMinimalData;
