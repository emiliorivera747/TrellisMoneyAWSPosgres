import { prisma } from "@/lib/prisma";
import { Holding } from "@/types/plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/isoToUTC";

export async function updateHoldings(holdings: Holding[], user_id: string) {
  for (let holding of holdings) {
    try {
    await prisma.holding.create({
      data: {
      user_id: user_id,
      account_id: getValueOrDefault(holding?.account_id, ""),
      cost_basis: getValueOrDefault(holding?.cost_basis, 0),
      institution_price: getValueOrDefault(holding?.institution_price, 0),
      institution_value: getValueOrDefault(holding?.institution_value, 0),
      quantity: getValueOrDefault(holding?.quantity, 0),
      vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
      vested_value: getValueOrDefault(holding?.vested_value, 0),
      security_id: holding.security_id,
      institution_price_as_of: isoToUTC(holding?.institution_price_as_of), 
      institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
      iso_currency_code: getValueOrDefault(holding?.iso_currency_code, ""),
      unofficial_currency_code: getValueOrDefault(holding?.unofficial_currency_code, ""),
      },
    });
    } catch (error: any) {
    console.log("Error creating holding: ", error?.message || error);
    }
  }
  }