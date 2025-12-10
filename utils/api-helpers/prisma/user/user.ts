import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) null;

  return user;
};

export const updateCustomerId = async (userId: string, customerId: string) => {
  const user = await prisma.user.update({
    where: { user_id: userId },
    data: { customer_id: customerId },
  });

  if (!user) null;

  return user;
};
