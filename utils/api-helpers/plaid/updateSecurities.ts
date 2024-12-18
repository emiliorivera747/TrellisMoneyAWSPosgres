import {prisma} from '@/lib/prisma';
import {Security} from '@/types/plaid';

export async function updateSecurities(securities: Security[], user_id: string) {
    for (let security of securities) {
      await prisma.security.upsert({
        where: { security_id: security.security_id },
        update: {
          close_price: security.close_price ?? 0,
          close_price_as_of: security.close_price_as_of ?? new Date(),
          name: security.name ?? "",
          sector: security.sector ?? "",
          industry: security.industry ?? "",
          ticker_symbol: security.ticker_symbol ?? "",
        },
        create: {
          user_id: user_id,
          ticker_symbol: security.ticker_symbol ?? "",
          security_id: security.security_id,
          close_price: security.close_price ?? 0,
          close_price_as_of: security.close_price_as_of ?? new Date(),
          name: security.name ?? "",
          sector: security.sector ?? "",
          industry: security.industry ?? "",
          isin: security.isin ?? "",
          cusip: security.cusip ?? "",
          sedol: security.sedol ?? "",
          update_datetime: security.update_datetime ?? new Date(),
          institution_security_id: security.institution_security_id ?? "",
          institution_id: security.institution_id ?? "",
          proxy_security_id: security.proxy_security_id ?? "",
          is_cash_equivalent: security.is_cash_equivalent ?? false,
          type: security.type ?? "",
          iso_currency_code: security.iso_currency_code ?? "",
          unofficial_currency_code: security.unofficial_currency_code ?? "",
          market_identifier_code: security.market_identifier_code ?? "",
        },
      });
    }
  }
  