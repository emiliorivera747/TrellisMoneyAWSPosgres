interface InstitutionStyle {
  color: string;
  domain: string;
}

const INSTITUTION_STYLES: Record<string, InstitutionStyle> = {
  chase: { color: "#117ACA", domain: "chase.com" },
  "bank of america": { color: "#E31837", domain: "bankofamerica.com" },
  "wells fargo": { color: "#D71E28", domain: "wellsfargo.com" },
  citi: { color: "#003B70", domain: "citi.com" },
  citibank: { color: "#003B70", domain: "citi.com" },
  "us bank": { color: "#0A2240", domain: "usbank.com" },
  "capital one": { color: "#D03027", domain: "capitalone.com" },
  "td bank": { color: "#34A853", domain: "td.com" },
  "american express": { color: "#007BC1", domain: "americanexpress.com" },
  amex: { color: "#007BC1", domain: "americanexpress.com" },
  discover: { color: "#FF6600", domain: "discover.com" },
  ally: { color: "#7B22D4", domain: "ally.com" },
  fidelity: { color: "#537B35", domain: "fidelity.com" },
  vanguard: { color: "#960000", domain: "vanguard.com" },
  "charles schwab": { color: "#0073CE", domain: "schwab.com" },
  schwab: { color: "#0073CE", domain: "schwab.com" },
  robinhood: { color: "#00C805", domain: "robinhood.com" },
  sofi: { color: "#750EF6", domain: "sofi.com" },
  "goldman sachs": { color: "#7399C6", domain: "goldmansachs.com" },
  marcus: { color: "#F7B900", domain: "marcus.com" },
  "navy federal": { color: "#193F6B", domain: "navyfederal.org" },
  usaa: { color: "#003366", domain: "usaa.com" },
  pnc: { color: "#F58025", domain: "pnc.com" },
  regions: { color: "#005C86", domain: "regions.com" },
  truist: { color: "#7A2182", domain: "truist.com" },
  keybank: { color: "#CC0000", domain: "key.com" },
  "fifth third": { color: "#00704A", domain: "53.com" },
  huntington: { color: "#006747", domain: "huntington.com" },
  citizens: { color: "#1B4F8A", domain: "citizensbank.com" },
  "m&t bank": { color: "#0078A0", domain: "mtb.com" },
  "bmo harris": { color: "#0079C1", domain: "bmo.com" },
  "first republic": { color: "#003C6C", domain: "firstrepublic.com" },
  "silicon valley bank": { color: "#CC0000", domain: "svb.com" },
  "e*trade": { color: "#6633CC", domain: "etrade.com" },
  etrade: { color: "#6633CC", domain: "etrade.com" },
  "td ameritrade": { color: "#00A651", domain: "tdameritrade.com" },
  merrill: { color: "#D03027", domain: "merrilledge.com" },
  "merrill lynch": { color: "#D03027", domain: "merrilledge.com" },
  wealthfront: { color: "#005F6B", domain: "wealthfront.com" },
  betterment: { color: "#0A9D8C", domain: "betterment.com" },
  coinbase: { color: "#0052FF", domain: "coinbase.com" },
  paypal: { color: "#003087", domain: "paypal.com" },
  venmo: { color: "#3D95CE", domain: "venmo.com" },
  "cash app": { color: "#00D632", domain: "cash.app" },
  chime: { color: "#1EC677", domain: "chime.com" },
};

export function getInstitutionStyle(institutionName: string | null | undefined): {
  color: string | null;
  logoUrl: string | null;
} {
  if (!institutionName) return { color: null, logoUrl: null };

  const normalized = institutionName.toLowerCase().trim();

  for (const [key, style] of Object.entries(INSTITUTION_STYLES)) {
    if (normalized.includes(key)) {
      return {
        color: style.color,
        logoUrl: `https://logo.clearbit.com/${style.domain}`,
      };
    }
  }

  return { color: null, logoUrl: null };
}
