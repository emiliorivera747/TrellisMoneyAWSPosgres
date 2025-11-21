import {prisma} from '@/lib/prisma';

/**
 * Get accounts with holdings and securities for a specific user
 * Optimized to use findUnique instead of findMany for single user lookup
 */
export const getAccountsHoldingsSecurities = async (user_id: string) => {
    const res = await prisma.user.findUnique({
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

    // Return empty array if user not found, maintaining compatibility
    return res ? [res] : [];
};
