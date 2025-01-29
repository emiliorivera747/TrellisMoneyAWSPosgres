export const getTypeLabel = (type: string) => {
  switch (type) {
    case "Investment":
      return "Investments";
    case "Depository":
      return "Depository";
    case "Retirement":
      return "Retirement Accounts";
    case "Credit":
      return "Credit Accounts";
    case "Loan":
      return "Loan Accounts";
    case "Other":
      return "Other Accounts";
    default:
      return "Unknown Type";
  }
};
