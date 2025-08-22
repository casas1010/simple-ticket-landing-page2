import PricingComparison from "../grapher/grapher";

/* ---------------- PRICING RULES ---------------- */
const pricingRules: Record<string, Record<string, any>> = {
  Standard: {
    Basic: { 
      perSeatPrice: 25, 
      maxUsers: 1, 
      notes: ['2% 3rd-party payment providers'] 
    },
    Grow: { 
      orgPrice: 65, 
      maxUsers: 5, 
      notes: ['1% 3rd-party payment providers'] 
    },
    Advanced: { 
      orgPrice: 399, 
      maxUsers: 15, 
      notes: ['0.6% 3rd-party payment providers'] 
    },
    Plus: { 
      orgPrice: 2300, 
      maxUsers: 'unlimited' 
    }
  }
};

/* ---------------- INITIAL CONFIG ---------------- */
const initialModuleConfigs: Record<string, { enabled: boolean; users: number }> = {
  Standard: { enabled: true, users: 3 }
};

/* ---------------- WRAPPER ---------------- */
export default function Shopify() {
  return (
    <PricingComparison
      pricingRules={pricingRules}
      initialModuleConfigs={initialModuleConfigs}
      title="Shopify Pricing Comparison"

    />
  );
}