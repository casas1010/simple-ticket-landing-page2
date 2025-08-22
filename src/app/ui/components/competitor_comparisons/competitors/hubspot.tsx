

import PricingComparison from "../grapher/grapher";

/* ---------------- PRICING RULES ---------------- */
const pricingRules: Record<string, Record<string, any>> = {
  Marketing: {
    free: { perSeatPrice: 0, maxUsers: 2 },
    starter: { perSeatPrice: 9 },
    professional: { orgPrice: 800, includedSeats: 3, perSeatPrice: 45 }
  },
  Sales: {
    free: { perSeatPrice: 0, maxUsers: 2 },
    starter: { perSeatPrice: 9 },
    professional: { perSeatPrice: 90 }
  },
  Service: {
    free: { perSeatPrice: 0, maxUsers: 2 },
    starter: { perSeatPrice: 9 },
    professional: { perSeatPrice: 90 }
  },
  Content: {
    free: { perSeatPrice: 0, maxUsers: 2 },
    starter: { perSeatPrice: 9 },
    professional: { orgPrice: 450, includedSeats: 3, perSeatPrice: 45 }
  },
  Operations: {
    free: { perSeatPrice: 0, maxUsers: 2 },
    starter: { perSeatPrice: 9 },
    professional: { orgPrice: 720, includedSeats: 1, perSeatPrice: 45 }
  }
};

/* ---------------- INITIAL CONFIG ---------------- */
const initialModuleConfigs: Record<string, { enabled: boolean; users: number }> = {
  Marketing: { enabled: true, users: 5 },
  Sales: { enabled: true, users: 5 },
  Service: { enabled: false, users: 3 },
  Content: { enabled: false, users: 2 },
  Operations: { enabled: false, users: 1 }
};

/* ---------------- WRAPPER ---------------- */
export default function HubSpot() {
  return (
    <PricingComparison
      pricingRules={pricingRules}
      initialModuleConfigs={initialModuleConfigs}
    />
  );
}