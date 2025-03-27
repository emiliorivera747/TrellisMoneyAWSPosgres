import {prisma} from '@/lib/prisma';
export const getAccountsHoldingsSecurities = async (user_id: string) => {
    const res = await prisma.user.findMany({
        where: {
            user_id: user_id
        },
        select: {
            accounts: {
                include: {
                    holdings: {
                        include: {
                            security: true
                        }
                    }
                }
            }
        }
    });

    return res;
};
