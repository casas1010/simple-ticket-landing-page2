import PricingComparison from "../grapher/grapher";

/* ---------------- PRICING RULES ---------------- */
const pricingRules: Record<string, Record<string, any>> = {
  "Small Business": {
    Starter: { perSeatPrice: 25 },
    Pro: { perSeatPrice: 100 },
    Enterprise: { perSeatPrice: 165 },
  },
  Sales: {
    Starter: { perSeatPrice: 25 },
    Pro: { perSeatPrice: 75 },
    Enterprise: { perSeatPrice: 175 },
  },
  "Service Cloud": {
    Starter: { perSeatPrice: 25 },
    Pro: { perSeatPrice: 100 },
    Enterprise: { perSeatPrice: 175 },
  },
  Marketing: {
    "Starter Suite": { perSeatPrice: 25 },
    "Marketing Cloud Growth Edition": { orgPrice: 1500 },
    "Marketing Cloud Advanced": { orgPrice: 3250 },
  },
  "Marketing Cloud Account Engagement": {
    Growth: { orgPrice: 1250 },
    Plus: { orgPrice: 2750 },
    Advanced: { orgPrice: 4400 },
    Premium: { orgPrice: 15000 },
  },
};

/* ---------------- INITIAL CONFIG ---------------- */
const initialModuleConfigs: Record<string, { enabled: boolean; users: number }> = {
  "Small Business": { enabled: true, users: 5 },
  "Sales": { enabled: true, users: 10 },
  "Service Cloud": { enabled: false, users: 5 },
  Marketing: { enabled: false, users: 3 },
  "Marketing Cloud Account Engagement": { enabled: false, users: 1 },
};

/* ---------------- WRAPPER ---------------- */
export default function SalesForce() {
  return (
    <PricingComparison
      pricingRules={pricingRules}
      initialModuleConfigs={initialModuleConfigs}
    />
  );
}