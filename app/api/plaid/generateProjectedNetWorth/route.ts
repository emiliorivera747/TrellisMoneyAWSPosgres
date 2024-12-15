import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";
import { mockHoldingData } from "@/utils/data/plaid-data/mockHoldingData";
import { mockAccountBalanceData } from "@/utils/data/plaid-data/mockAccountBalanceData";
import { prisma } from "@/lib/prisma";
import { Holding } from "@/types/plaid";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

export async function GET(req: NextRequest) {
  const userId = "abcd2343-ec61-4932-83c2-b276b6b157d4";
  const { searchParams } = new URL(req.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  console.log("Start Date: ", start_date);
  console.log("End Date: ", end_date);

  try {
    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;
    await updateAccounts(accounts, userId);
    await updateHoldings(holdings);
    await updateSecurities(securities);

    return NextResponse.json(
      { message: "Accounts, holdings, and securities updated successfully.", accounts },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching projected net worth data" },
      { status: 500 }
    );
  }
}

async function updateAccounts(accounts: any[], userId: string) {
  for (let account of accounts) {
    await prisma.account.upsert({
      where: { account_id: account.account_id },
      update: {
        name: account.name,
        type: account.type,
        available: account.balances?.available ?? 0,
        current: account.balances?.current,
        limit: account.balances?.limit ?? 0,
        iso_currency_code: account.balances?.iso_currency_code,
      },
      create: {
        account_id: account.account_id,
        name: account.name,
        type: account.type,
        available: account.balances?.available ?? 0,
        current: account.balances?.current,
        iso_currency_code: account.balances?.iso_currency_code,
        limit: account.balances?.limit ?? 0,
        user_id: userId,
        unofficial_currency_code: account.balances?.unofficial_currency_code ?? "",
      },
    });
  }
}

async function updateHoldings(holdings: Holding[]) {
  for (let holding of holdings) {
    await prisma.holding.upsert({
      where: { holding_id: holding.holding_id },
      update: {
        cost_basis: holding.cost_basis ?? 0,
        institution_price: holding.institution_price,
        institution_value: holding.institution_value ?? 0,
        quantity: holding.quantity ?? 0,
        account_id: holding.account_id,
        security_id: holding.security_id,
      },
      create: {
        holding_id: holding.holding_id,
        cost_basis: holding.cost_basis ?? 0,
        institution_price: holding.institution_price,
        institution_value: holding.institution_value ?? 0,
        quantity: holding.quantity ?? 0,
        vested_quantity: holding.vested_quantity ?? 0,
        vested_value: 0,
        account_id: holding.account_id,
        security_id: holding.security_id,
        institution_price_as_of: new Date(),
        institution_price_datetime: new Date(),
        iso_currency_code: holding.iso_currency_code ?? "",
        unofficial_currency_code: holding.unofficial_currency_code ?? "",
      },
    });
  }
}

async function updateSecurities(securities: any[]) {
  for (let security of securities) {
    await prisma.security.upsert({
      where: { security_id: security.security_id },
      update: {
        close_price: security.close_price ?? 0,
        close_price_as_of: security.close_price_as_of ?? new Date(),
        name: security.name ?? "",
        sector: security.sector ?? "",
        industry: security.industry ?? "",
      },
      create: {
        security_id: security.security_id,
        close_price: security.close_price ?? 0,
        close_price_as_of: security.close_price_as_of ?? new Date(),
        name: security.name ?? "",
        sector: security.sector ?? "",
        industry: security.industry ?? "",
        isin: security.isin ?? "",
        cusip: security.cusip ?? "",
        sedol: security.sedol ?? "",
        institution_security_id: security.institution_security_id ?? "",
        institution_id: security.institution_id ?? "",
        proxy_security_id: security.proxy_security_id ?? "",
        is_cash_equivalent: security.is_cash_equivalent ?? false,
        type: security.type ?? "",
        iso_currency_code: security.iso_currency_code ?? "",
        unofficial_currency_code: security.unofficial_currency_code ?? "",
      },
    });
  }
}
