export function handleErrors(accounts: any, holdings: any, securities: any) {
  if (!accounts) throw new Error("No accounts found");
  if (!holdings) throw new Error("No holdings found");
  if (!securities) throw new Error("No securities found");
}
