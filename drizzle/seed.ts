import "dotenv/config";
import { db, client } from "@/drizzle/db";
import { inArray } from "drizzle-orm";
import {
  item,
  itemStatus,
  account,
  security,
  holding,
  netWorthSnapshot,
} from "@/drizzle/schema";

// ─── Target user ────────────────────────────────────────────────────────────
const USER_ID = "5351287a-f45b-4005-a69e-02a103428738";

// ─── Existing household + member (from DB) ───────────────────────────────────
const HOUSEHOLD_ID = "4cea6b1a-ae94-4910-a819-27928d058290";
const HM_ID = "90c6ed30-b08a-4879-b7ca-c48024b8c955";

const ITEM_CHASE = "mock-item-chase-001";
const ITEM_FIDELITY = "mock-item-fidelity-001";
const ITEM_ROBINHOOD = "mock-item-robinhood-001";

const ACCT_CHASE_CHECKING = "mock-acct-chase-checking-001";
const ACCT_CHASE_SAVINGS = "mock-acct-chase-savings-001";
const ACCT_CHASE_CREDIT = "mock-acct-chase-credit-001";
const ACCT_FIDELITY_401K = "mock-acct-fidelity-401k-001";
const ACCT_FIDELITY_IRA = "mock-acct-fidelity-ira-001";
const ACCT_ROBINHOOD_BROKERAGE = "mock-acct-robinhood-brokerage-001";
const ACCT_ROBINHOOD_CASH = "mock-acct-robinhood-cash-001";

const SEC_VOO = "mock-sec-voo-001";
const SEC_AAPL = "mock-sec-aapl-001";
const SEC_MSFT = "mock-sec-msft-001";
const SEC_TSLA = "mock-sec-tsla-001";
const SEC_KO = "mock-sec-ko-001";
const SEC_VXUS = "mock-sec-vxus-001";
const SEC_TBILL = "mock-sec-tbill-001";

const NOW = new Date().toISOString();
const TODAY = new Date().toISOString().slice(0, 10);

function monthsAgo(n: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}

const MOCK_ACCOUNT_IDS = [
  ACCT_CHASE_CHECKING,
  ACCT_CHASE_SAVINGS,
  ACCT_CHASE_CREDIT,
  ACCT_FIDELITY_401K,
  ACCT_FIDELITY_IRA,
  ACCT_ROBINHOOD_BROKERAGE,
  ACCT_ROBINHOOD_CASH,
];

const MOCK_HOLDING_IDS = [
  "mock-holding-401k-voo",
  "mock-holding-401k-vxus",
  "mock-holding-401k-tbill",
  "mock-holding-ira-aapl",
  "mock-holding-ira-msft",
  "mock-holding-rh-tsla",
  "mock-holding-rh-ko",
];

const MOCK_ITEM_IDS = [ITEM_CHASE, ITEM_FIDELITY, ITEM_ROBINHOOD];

const MOCK_SNAPSHOT_IDS = [
  "mock-nw-snap-6",
  "mock-nw-snap-5",
  "mock-nw-snap-4",
  "mock-nw-snap-3",
  "mock-nw-snap-2",
  "mock-nw-snap-1",
];

async function seed() {
  console.log("🌱 Seeding mock data for user:", USER_ID);
  console.log("   Household:", HOUSEHOLD_ID, "| Member:", HM_ID);

  // ── 0. Clean up stale mock data (delete → re-insert ensures correct FKs) ──
  // Must delete in FK-dependency order: holdings → accounts → itemStatuses → items → snapshots
  await db.delete(holding).where(inArray(holding.holdingId, MOCK_HOLDING_IDS));
  await db.delete(account).where(inArray(account.accountId, MOCK_ACCOUNT_IDS));
  await db.delete(itemStatus).where(inArray(itemStatus.itemId, MOCK_ITEM_IDS));
  await db.delete(item).where(inArray(item.itemId, MOCK_ITEM_IDS));
  await db.delete(netWorthSnapshot).where(inArray(netWorthSnapshot.netWorthSnapshotId, MOCK_SNAPSHOT_IDS));
  console.log("   Cleaned up any existing mock rows.");

  // ── 1. Items (Plaid institution connections) ──────────────────────────────
  await db
    .insert(item)
    .values([
      {
        itemId: ITEM_CHASE,
        userId: USER_ID,
        institutionId: "ins_3",
        institutionName: "Chase",
        accessToken: "access-sandbox-mock-chase-001",
        webhook: "https://webhook.example.com/plaid",
        createdAt: NOW,
      },
      {
        itemId: ITEM_FIDELITY,
        userId: USER_ID,
        institutionId: "ins_4",
        institutionName: "Fidelity",
        accessToken: "access-sandbox-mock-fidelity-001",
        webhook: "https://webhook.example.com/plaid",
        createdAt: NOW,
      },
      {
        itemId: ITEM_ROBINHOOD,
        userId: USER_ID,
        institutionId: "ins_5",
        institutionName: "Robinhood",
        accessToken: "access-sandbox-mock-robinhood-001",
        webhook: "https://webhook.example.com/plaid",
        createdAt: NOW,
      },
    ])
    .onConflictDoNothing();

  // ── 2. ItemStatuses ───────────────────────────────────────────────────────
  await db
    .insert(itemStatus)
    .values([
      { itemId: ITEM_CHASE, transactionsLastSuccessfulUpdate: NOW, updatedAt: NOW },
      { itemId: ITEM_FIDELITY, transactionsLastSuccessfulUpdate: NOW, updatedAt: NOW },
      { itemId: ITEM_ROBINHOOD, transactionsLastSuccessfulUpdate: NOW, updatedAt: NOW },
    ])
    .onConflictDoNothing();

  // ── 3. Accounts ───────────────────────────────────────────────────────────
  await db
    .insert(account)
    .values([
      {
        accountId: ACCT_CHASE_CHECKING,
        itemId: ITEM_CHASE,
        householdMemberId: HM_ID,
        accountName: "Chase Checking",
        officialName: "JP Morgan Chase Checking",
        type: "DEPOSITORY",
        subtype: "checking",
        mask: "4521",
        availableBalance: "28500",
        currentBalance: "28500",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_CHASE_SAVINGS,
        itemId: ITEM_CHASE,
        householdMemberId: HM_ID,
        accountName: "Chase Savings",
        officialName: "JP Morgan Chase Savings",
        type: "DEPOSITORY",
        subtype: "savings",
        mask: "8834",
        availableBalance: "92000",
        currentBalance: "92000",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_CHASE_CREDIT,
        itemId: ITEM_CHASE,
        householdMemberId: HM_ID,
        accountName: "Chase Freedom Unlimited",
        officialName: "Chase Freedom Unlimited Credit Card",
        type: "CREDIT",
        subtype: "credit card",
        mask: "1209",
        availableBalance: "30250",
        currentBalance: "4750",
        limitAmount: "35000",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_FIDELITY_401K,
        itemId: ITEM_FIDELITY,
        householdMemberId: HM_ID,
        accountName: "Fidelity 401(k)",
        officialName: "Fidelity 401(k) Plan",
        type: "INVESTMENT",
        subtype: "401k",
        mask: "7701",
        availableBalance: null,
        currentBalance: "524300",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        expectedAnnualReturnRate: "0.07",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_FIDELITY_IRA,
        itemId: ITEM_FIDELITY,
        householdMemberId: HM_ID,
        accountName: "Fidelity Roth IRA",
        officialName: "Fidelity Roth IRA",
        type: "INVESTMENT",
        subtype: "ira",
        mask: "3312",
        availableBalance: null,
        currentBalance: "148200",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        expectedAnnualReturnRate: "0.07",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_ROBINHOOD_BROKERAGE,
        itemId: ITEM_ROBINHOOD,
        householdMemberId: HM_ID,
        accountName: "Robinhood Brokerage",
        officialName: "Robinhood Individual Brokerage Account",
        type: "INVESTMENT",
        subtype: "brokerage",
        mask: "6660",
        availableBalance: null,
        currentBalance: "287400",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        expectedAnnualReturnRate: "0.08",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        accountId: ACCT_ROBINHOOD_CASH,
        itemId: ITEM_ROBINHOOD,
        householdMemberId: HM_ID,
        accountName: "Robinhood Cash",
        officialName: "Robinhood Cash Management Account",
        type: "DEPOSITORY",
        subtype: "money market",
        mask: "4444",
        availableBalance: "18200",
        currentBalance: "18200",
        limitAmount: "0",
        verificationStatus: "AUTOMATICALLY_VERIFIED",
        createdAt: NOW,
        updatedAt: NOW,
      },
    ]);

  // ── 4. Securities ─────────────────────────────────────────────────────────
  await db
    .insert(security)
    .values([
      {
        securityId: SEC_VOO,
        securityName: "Vanguard S&P 500 ETF",
        tickerSymbol: "VOO",
        type: "etf",
        isCashEquivalent: false,
        closePrice: "549.71",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: null,
        industry: null,
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_AAPL,
        securityName: "Apple Inc.",
        tickerSymbol: "AAPL",
        type: "equity",
        isCashEquivalent: false,
        closePrice: "228.87",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: "Technology Services",
        industry: "Computer Hardware",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_MSFT,
        securityName: "Microsoft Corporation",
        tickerSymbol: "MSFT",
        type: "equity",
        isCashEquivalent: false,
        closePrice: "415.50",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: "Technology Services",
        industry: "Packaged Software",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_TSLA,
        securityName: "Tesla, Inc.",
        tickerSymbol: "TSLA",
        type: "equity",
        isCashEquivalent: false,
        closePrice: "352.14",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: "Consumer Durables",
        industry: "Motor Vehicles",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_KO,
        securityName: "The Coca-Cola Company",
        tickerSymbol: "KO",
        type: "equity",
        isCashEquivalent: false,
        closePrice: "63.63",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: "Consumer Non-Durables",
        industry: "Beverages",
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_VXUS,
        securityName: "Vanguard Total International Stock ETF",
        tickerSymbol: "VXUS",
        type: "etf",
        isCashEquivalent: false,
        closePrice: "63.18",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: null,
        industry: null,
        createdAt: NOW,
        updatedAt: NOW,
      },
      {
        securityId: SEC_TBILL,
        securityName: "US Treasury Bill 5.00% 2025",
        tickerSymbol: null,
        type: "fixed income",
        isCashEquivalent: false,
        closePrice: "98.50",
        closePriceAsOf: "2025-02-14",
        isoCurrencyCode: "USD",
        sector: "Government",
        industry: "Sovereign Government",
        createdAt: NOW,
        updatedAt: NOW,
      },
    ])
    .onConflictDoNothing();

  // ── 5. Holdings ───────────────────────────────────────────────────────────
  const holdings = [
    // Fidelity 401k  (~$524,300 total)
    {
      holdingId: "mock-holding-401k-voo",
      accountId: ACCT_FIDELITY_401K,
      securityId: SEC_VOO,
      quantity: "450",
      costBasis: "185000",
      institutionPrice: "549.71",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "247369.50",   // 450 × 549.71
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.07",
      createdAt: NOW,
    },
    {
      holdingId: "mock-holding-401k-vxus",
      accountId: ACCT_FIDELITY_401K,
      securityId: SEC_VXUS,
      quantity: "1800",
      costBasis: "88000",
      institutionPrice: "63.18",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "113724.00",   // 1800 × 63.18
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.06",
      createdAt: NOW,
    },
    {
      holdingId: "mock-holding-401k-tbill",
      accountId: ACCT_FIDELITY_401K,
      securityId: SEC_TBILL,
      quantity: "1650",
      costBasis: "158000",
      institutionPrice: "98.50",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "162525.00",   // 1650 × 98.50
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.05",
      createdAt: NOW,
    },
    // Fidelity Roth IRA  (~$148,200 total)
    {
      holdingId: "mock-holding-ira-aapl",
      accountId: ACCT_FIDELITY_IRA,
      securityId: SEC_AAPL,
      quantity: "290",
      costBasis: "52000",
      institutionPrice: "228.87",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "66372.30",    // 290 × 228.87
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.08",
      createdAt: NOW,
    },
    {
      holdingId: "mock-holding-ira-msft",
      accountId: ACCT_FIDELITY_IRA,
      securityId: SEC_MSFT,
      quantity: "197",
      costBasis: "72000",
      institutionPrice: "415.50",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "81853.50",    // 197 × 415.50
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.09",
      createdAt: NOW,
    },
    // Robinhood Brokerage  (~$287,400 total)
    {
      holdingId: "mock-holding-rh-tsla",
      accountId: ACCT_ROBINHOOD_BROKERAGE,
      securityId: SEC_TSLA,
      quantity: "210",
      costBasis: "58000",
      institutionPrice: "352.14",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "73949.40",    // 210 × 352.14
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.1",
      createdAt: NOW,
    },
    {
      holdingId: "mock-holding-rh-ko",
      accountId: ACCT_ROBINHOOD_BROKERAGE,
      securityId: SEC_KO,
      quantity: "3360",
      costBasis: "178000",
      institutionPrice: "63.63",
      institutionPriceAsOf: "2025-02-14T00:00:00.000Z",
      institutionValue: "213796.80",   // 3360 × 63.63
      isoCurrencyCode: "USD",
      expectedAnnualReturnRate: "0.06",
      createdAt: NOW,
    },
  ];

  await db.insert(holding).values(holdings).onConflictDoNothing();

  // ── 6. Net Worth Snapshots ────────────────────────────────────────────────
  // Now:  cash $138,700 + investments $959,900 = $1,098,600 assets − $4,750 = $1,093,850 NW
  const snapshots = [
    {
      netWorthSnapshotId: "mock-nw-snap-6",
      householdId: HOUSEHOLD_ID,
      snapshotDate: monthsAgo(6),
      totalAssets: "897800",
      totalLiabilities: "3200",
      netWorth: "894600",
      cashAssets: "115000",
      investmentAssets: "782800",
      otherAssets: "0",
      creditLiabilities: "3200",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
    {
      netWorthSnapshotId: "mock-nw-snap-5",
      householdId: HOUSEHOLD_ID,
      snapshotDate: monthsAgo(5),
      totalAssets: "934000",
      totalLiabilities: "4100",
      netWorth: "929900",
      cashAssets: "120000",
      investmentAssets: "814000",
      otherAssets: "0",
      creditLiabilities: "4100",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
    {
      netWorthSnapshotId: "mock-nw-snap-4",
      householdId: HOUSEHOLD_ID,
      snapshotDate: monthsAgo(4),
      totalAssets: "962500",
      totalLiabilities: "3800",
      netWorth: "958700",
      cashAssets: "125000",
      investmentAssets: "837500",
      otherAssets: "0",
      creditLiabilities: "3800",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
    {
      netWorthSnapshotId: "mock-nw-snap-3",
      householdId: HOUSEHOLD_ID,
      snapshotDate: monthsAgo(3),
      totalAssets: "1000200",
      totalLiabilities: "5100",
      netWorth: "995100",
      cashAssets: "128000",
      investmentAssets: "872200",
      otherAssets: "0",
      creditLiabilities: "5100",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
    {
      netWorthSnapshotId: "mock-nw-snap-2",
      householdId: HOUSEHOLD_ID,
      snapshotDate: monthsAgo(2),
      totalAssets: "1040100",
      totalLiabilities: "4400",
      netWorth: "1035700",
      cashAssets: "132000",
      investmentAssets: "908100",
      otherAssets: "0",
      creditLiabilities: "4400",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
    {
      netWorthSnapshotId: "mock-nw-snap-1",
      householdId: HOUSEHOLD_ID,
      snapshotDate: TODAY,
      totalAssets: "1098600",
      totalLiabilities: "4750",
      netWorth: "1093850",
      cashAssets: "138700",   // $28,500 checking + $92,000 savings + $18,200 RH cash
      investmentAssets: "959900", // $524,300 401k + $148,200 IRA + $287,400 brokerage
      otherAssets: "0",
      creditLiabilities: "4750",
      loanLiabilities: "0",
      otherLiabilities: "0",
      calculationVersion: "1",
      source: "SYSTEM" as const,
    },
  ];

  await db.insert(netWorthSnapshot).values(snapshots).onConflictDoNothing();

  console.log("✅ Mock data seeded successfully!");
  console.log("   Household:   ", HOUSEHOLD_ID);
  console.log("   HH Member:   ", HM_ID);
  console.log("   Items:        mock-item-chase-001, mock-item-fidelity-001, mock-item-robinhood-001");
  console.log("   Accounts:    ", 7);
  console.log("   Securities:  ", 7);
  console.log("   Holdings:    ", holdings.length);
  console.log("   NW Snapshots:", snapshots.length);
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => client.end());
