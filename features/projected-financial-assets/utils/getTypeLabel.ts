export const getTypeLabel = (type: string) => {
  switch (type) {
    case "investment":
      return "Investments";
    case "depository":
      return "Depository";
    case "retirement":
      return "Retirement Accounts";
    case "credit":
      return "Credit Accounts";
    case "loan":
      return "Loan Accounts";
    case "other":
      return "Other Accounts";
    default:
      return "Unknown Type";
  }
};
