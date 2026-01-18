const unixToISO = (unixSeconds: number | null | undefined): string | null => {
  if (unixSeconds == null) return null;
  const date = new Date(unixSeconds * 1000);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

export default unixToISO;
