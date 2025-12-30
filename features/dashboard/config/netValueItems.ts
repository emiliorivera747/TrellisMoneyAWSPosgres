export const NET_VALUE_ITEMS = [
    {
      title: "Net worth",
      linkLabel: "Accounts",
      linkUrl: "/accounts",
      values: (netWorthData: any) => ({
        primary: netWorthData?.data?.netWorth ?? 0,
        secondary: netWorthData?.data?.assets ?? 0,
        tertiary: netWorthData?.data?.liabilities ?? 0,
      }),
      labels: {
        secondary: "Assets",
        tertiary: "Liabilities",
      },
      modal: {
        title: "Net worth",
        description:
          "Net worth reflects your financial position. A positive value means your assets exceed debts, while a negative value indicates more debt than assets.",
      },
    },
    {
      title: "Cash Flow",
      linkLabel: "Accounts",
      linkUrl: "/accounts",
      values: () => ({
        primary: 10000,
        secondary: 20000,
        tertiary: 10000,
      }),
      labels: {
        secondary: "All income",
        tertiary: "All spending",
      },
      modal: {
        title: "Cash flow",
        description:
          "Cash flow shows how money moves in and out. A positive value means you’re earning more than you spend, while a negative value suggests you’re spending beyond your income.",
      },
    },
  ];