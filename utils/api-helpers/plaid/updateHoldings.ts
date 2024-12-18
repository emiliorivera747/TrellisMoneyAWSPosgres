import { prisma } from "@/lib/prisma";
import { Holding } from "@/types/plaid";

export async function updateHoldings(holdings: Holding[], user_id: string) {
    for (let holding of holdings) {
      try {
        await prisma.holding.create({
          data: {
            user_id: user_id,
            account_id: holding.account_id ?? "",
            cost_basis: holding.cost_basis ?? 0,
            institution_price: holding.institution_price,
            institution_value: holding.institution_value ?? 0,
            quantity: holding.quantity ?? 0,
            vested_quantity: holding.vested_quantity ?? 0,
            vested_value: 0,
            security_id: holding.security_id,
            institution_price_as_of:
              holding.institution_price_as_of ?? new Date(),
            institution_price_datetime:
              holding.institution_price_datetime ?? new Date(),
            iso_currency_code: holding.iso_currency_code ?? "",
            unofficial_currency_code: holding.unofficial_currency_code ?? "",
          },
        });
      } catch (error: any) {
        console.log("Error creating holding: ", error?.message || error);
      }
    }
  }