export const netWorthConfig = (
  netWorth: number,
  assets: number,
  liabilities: number
) => {
  return {
    title: "Net worth",
    linkLabel: "Accounts",
    linkUrl: "/accounts",
    primaryValue: { netWorth },
    secondaryValue: { assets },
    tertiaryValue: { liabilities },
    secondaryLabel: "Assets",
    tertiaryLabel: "Liabilities",
    modalTitle: "Net worth",
    modalDescription:
      "Net worth reflects your financial position. A positive value means your assets exceed debts, while a negative value indicates more debt than assets.",
  };
};
