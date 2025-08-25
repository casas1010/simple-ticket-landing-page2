import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

/* ---------------- TYPES ---------------- */
interface ModuleConfig {
  enabled: boolean;
  users: number;
}

interface PricingRule {
  orgPrice?: number;
  includedSeats?: number;
  perSeatPrice?: number;
  maxUsers?: number | "unlimited";
  notes?: string[];
}

/* ---------------- UTIL FUNCTIONS ---------------- */
// Get all tiers for a specific module from pricingRules
const getModuleTiers = (pricingRules: Record<string, Record<string, PricingRule>>, module: string): string[] => {
  return Object.keys(pricingRules[module] || {});
};

// Get all unique tiers across all ENABLED modules only
const getEnabledTiers = (pricingRules: Record<string, Record<string, PricingRule>>, moduleConfigs: Record<string, ModuleConfig>): string[] => {
  const enabledTiers = new Set<string>();
  Object.entries(moduleConfigs).forEach(([module, config]) => {
    if (config.enabled && config.users > 0) {
      Object.keys(pricingRules[module] || {}).forEach(tier => {
        enabledTiers.add(tier);
      });
    }
  });
  return Array.from(enabledTiers);
};

// Get all unique tiers across all modules
const getAllTiers = (pricingRules: Record<string, Record<string, PricingRule>>): string[] => {
  const allTiers = new Set<string>();
  Object.keys(pricingRules).forEach(module => {
    Object.keys(pricingRules[module]).forEach(tier => {
      allTiers.add(tier);
    });
  });
  return Array.from(allTiers);
};

// Convert tier name to data key
const tierToKey = (tier: string): string => {
  return tier.toLowerCase().replace(/\s+/g, '');
};

// Get proper legend label for tier based on module
const getTierLegendLabel = (pricingRules: Record<string, Record<string, PricingRule>>, tier: string): string => {
  // Find which modules have this tier
  const modulesWithTier = Object.keys(pricingRules).filter(module =>
    Object.keys(pricingRules[module]).includes(tier)
  );

  // Create proper legend labels based on the requirements
  const legendLabels: Record<string, string> = {};

  // Small Business tiers
  if (modulesWithTier.includes("Small Business")) {
    legendLabels["Starter"] = "Small Business - Starter";
    legendLabels["Pro"] = "Small Business - Pro";
    legendLabels["Enterprise"] = "Small Business - Enterprise";
  }

  // Sales tiers
  if (modulesWithTier.includes("Sales")) {
    legendLabels["Starter"] = "Sales - Starter";
    legendLabels["Pro"] = "Sales - Pro";
    legendLabels["Enterprise"] = "Sales - Enterprise";
  }

  // Service Cloud tiers
  if (modulesWithTier.includes("Service Cloud")) {
    legendLabels["Starter"] = "Service Cloud - Starter";
    legendLabels["Pro"] = "Service Cloud - Pro";
    legendLabels["Enterprise"] = "Service Cloud - Enterprise";
  }

  // Marketing tiers
  if (modulesWithTier.includes("Marketing")) {
    legendLabels["Starter Suite"] = "Marketing - Starter Suite";
    legendLabels["Marketing Cloud Growth Edition"] = "Marketing - Marketing Cloud Growth Edition";
    legendLabels["Marketing Cloud Advanced"] = "Marketing - Marketing Cloud Advanced";
  }

  // Marketing Cloud Account Engagement tiers
  if (modulesWithTier.includes("Marketing Cloud Account Engagement")) {
    legendLabels["Growth"] = "Marketing Cloud Account Engagement - Growth";
    legendLabels["Plus"] = "Marketing Cloud Account Engagement - Plus";
    legendLabels["Advanced"] = "Marketing Cloud Account Engagement - Advanced";
    legendLabels["Premium"] = "Marketing Cloud Account Engagement - Premium";
  }

  return legendLabels[tier] || tier;
};

const calculateModulePrice = (
  pricingRules: Record<string, Record<string, PricingRule>>,
  module: string,
  tier: string,
  users: number
): number => {
  const rule = pricingRules[module]?.[tier];
  if (!rule) return 0;

  // Check user limits first
  if (rule.maxUsers !== undefined && rule.maxUsers !== 'unlimited' && users > rule.maxUsers) {
    return Infinity; // Not available if exceeds maxUsers
  }

  // Handle free tier with maxUsers limit
  if (tier === 'free' || rule.perSeatPrice === 0) {
    if (rule.maxUsers === 'unlimited' || users <= (rule.maxUsers || 0)) {
      return 0;
    }
    return Infinity; // Not available if exceeds maxUsers
  }

  // Handle orgPrice (flat organizational pricing)
  if (rule.orgPrice !== undefined) {
    return rule.orgPrice;
  }

  // Handle orgPrice with includedSeats
  if (rule.orgPrice !== undefined && rule.includedSeats !== undefined) {
    if (users <= rule.includedSeats) {
      return rule.orgPrice;
    }
    return rule.orgPrice + (users - rule.includedSeats) * (rule.perSeatPrice || 0);
  }

  // Handle simple per-seat pricing
  if (rule.perSeatPrice !== undefined) {
    return users * rule.perSeatPrice;
  }

  return 0;
};

const calculateTierTotal = (
  pricingRules: Record<string, Record<string, PricingRule>>,
  moduleConfigs: Record<string, ModuleConfig>,
  tier: string
): number => {
  let total = 0;
  for (const [module, config] of Object.entries(moduleConfigs)) {
    if (config.enabled && config.users > 0) {
      const moduleTiers = getModuleTiers(pricingRules, module);
      if (moduleTiers.includes(tier)) {
        const modulePrice = calculateModulePrice(pricingRules, module, tier, config.users);
        if (modulePrice === Infinity) return Infinity; // If any module is not available, tier is not available
        total += modulePrice;
      }
    }
  }
  return total;
};

/* ---------------- COMPONENTS ---------------- */
function ModuleConfigPanel({
  moduleConfigs,
  updateModuleConfig,
}: {
  moduleConfigs: Record<string, ModuleConfig>;
  updateModuleConfig: (module: string, updates: Partial<ModuleConfig>) => void;
}) {
  const modules = Object.keys(moduleConfigs);

  return (
    <div className="rounded-xl shadow-xl p-6 backdrop-blur-lg bg-white/10 border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-white">Module Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <div key={module} className="border rounded-lg p-4 backdrop-blur-sm bg-white/10 border-white/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white text-sm">{module}</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={moduleConfigs[module].enabled}
                  onChange={(e) => updateModuleConfig(module, { enabled: e.target.checked })}
                  className="mr-2 accent-blue-500"
                />
                <span className="text-sm text-gray-200">Enabled</span>
              </label>
            </div>
            {moduleConfigs[module].enabled && (
              <div>
                <label className="block text-sm text-gray-200 mb-1">Users:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateModuleConfig(module, { users: Math.max(1, moduleConfigs[module].users - 1) })
                    }
                    className="w-8 h-8 text-sm font-bold rounded-lg bg-red-500/70 text-white hover:bg-red-600"
                  >
                    –
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={moduleConfigs[module].users}
                    onChange={(e) => updateModuleConfig(module, { users: Number(e.target.value) })}
                    className="w-16 text-center border rounded-lg py-1 text-sm bg-white/20 text-white border-white/30"
                  />

                  <button
                    onClick={() =>
                      updateModuleConfig(module, { users: Math.min(100, moduleConfigs[module].users + 1) })
                    }
                    className="w-8 h-8 text-sm font-bold rounded-lg bg-green-500/70 text-white hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TierPricingSummary({
  moduleConfigs,
  pricingRules,
}: {
  moduleConfigs: Record<string, ModuleConfig>;
  pricingRules: Record<string, Record<string, PricingRule>>;
}) {
  // Get enabled modules and their tiers
  const enabledModules = Object.entries(moduleConfigs)
    .filter(([, config]) => config.enabled && config.users > 0)
    .map(([module]) => module);

  const calculateModuleTierPrice = (module: string, tier: string): number => {
    const users = moduleConfigs[module].users;
    return calculateModulePrice(pricingRules, module, tier, users);
  };

  return (
    <div className="rounded-xl shadow-xl p-6 backdrop-blur-lg bg-white/10 border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-white">Tier Pricing Summary (by Module in USD)</h2>
      {enabledModules.length === 0 ? (
        <p className="text-gray-300 italic">No modules enabled</p>
      ) : (
        <div className="space-y-6">
          {enabledModules.map((module) => {
            const moduleTiers = getModuleTiers(pricingRules, module);
            return (
              <div key={module} className="border rounded-lg p-4 backdrop-blur-sm bg-white/5 border-white/20">
                <h3 className="font-semibold text-white mb-3">{module} ({moduleConfigs[module].users} users)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {moduleTiers.map((tier) => {
                    const price = calculateModuleTierPrice(module, tier);
                    return (
                      <div key={tier} className="border rounded-lg p-3 text-center backdrop-blur-sm bg-white/10 border-white/30">
                        <h4 className="font-medium text-sm mb-2 text-white">{tier}</h4>
                        <p className="text-lg font-bold text-cyan-300">
                          {(() => {
                            const price = calculateModuleTierPrice(module, tier);
                            if (price === Infinity) return "Not Available";
                            if (price === 0) return "Free";
                            return `$${price.toLocaleString()}/mo`;
                          })()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PricingChart({
  data, maxUsers, setMaxUsers, tiers, pricingRules
}: {
  data: any[];
  maxUsers: number;
  setMaxUsers: (val: number) => void;
  tiers: string[];
  pricingRules: Record<string, Record<string, PricingRule>>;
}) {
  // Generate dynamic legend configuration with proper labels - only for enabled tiers
  const legendConfig = useMemo(() => {
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316", "#6366f1"];
    return tiers.map((tier, index) => ({
      key: tierToKey(tier),
      name: getTierLegendLabel(pricingRules, tier),
      stroke: colors[index % colors.length]
    }));
  }, [tiers, pricingRules]);

  return (
    <div className="rounded-xl shadow-xl p-6 backdrop-blur-lg bg-white/10 border border-white/20">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-white">Chart Max Users:</label>
        <input
          type="number"
          min={5}
          max={100}
          value={maxUsers}
          onChange={(e) => setMaxUsers(Number(e.target.value))}
          className="border rounded px-3 py-1 w-20 bg-white/20 text-white placeholder-gray-300 border-white/30"
        />
        <span className="text-sm text-gray-200">(Scaling based on module configuration)</span>
      </div>

      {tiers.length === 0 ? (
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center">
          <p className="text-gray-300 italic">No enabled modules to display in chart</p>
        </div>
      ) : (
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
              <XAxis dataKey="users" stroke="rgba(255,255,255,0.8)" />
              <YAxis stroke="rgba(255,255,255,0.8)" />
              <Tooltip
                formatter={(value, name) => [
                  value === null ? "Not Available" :
                    value === 0 ? "Free" :
                      `${value?.toLocaleString()}`,
                  // Find the proper legend name for this key
                  legendConfig.find(config => config.key === name)?.name || String(name),
                ]}
                labelFormatter={(label) => `Scaling Factor: ${label}x`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Legend />
              {/* Dynamic lines based on legend config - only for enabled tiers */}
              {legendConfig.map((config) => (
                <Line
                  key={config.key}
                  type="monotone"
                  dataKey={config.key}
                  stroke={config.stroke}
                  strokeWidth={3}
                  name={config.name}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function ActiveModulesSummary({ moduleConfigs }: { moduleConfigs: Record<string, ModuleConfig> }) {
  return (
    <div className="rounded-xl shadow-xl p-6 backdrop-blur-lg bg-white/10 border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-white">Active Modules</h2>
      {Object.entries(moduleConfigs)
        .filter(([, config]) => config.enabled)
        .map(([module, config]) => (
          <div key={module} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
            <span className="font-medium text-white text-sm">{module}</span>
            <span className="text-gray-200">{config.users} users</span>
          </div>
        ))}
      {Object.values(moduleConfigs).every((config) => !config.enabled) && (
        <p className="text-gray-300 italic">No modules enabled</p>
      )}
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function PricingComparison({
  pricingRules,
  initialModuleConfigs,
  title = "Pricing Comparison",
  gradientClass = ""
}: {
  pricingRules: Record<string, Record<string, PricingRule>>;
  initialModuleConfigs: Record<string, ModuleConfig>;
  title?: string;
  gradientClass?: string;
}) {
  const [maxUsers, setMaxUsers] = useState(20);
  const [moduleConfigs, setModuleConfigs] = useState<Record<string, ModuleConfig>>(initialModuleConfigs);

  const updateModuleConfig = (module: string, updates: Partial<ModuleConfig>) => {
    setModuleConfigs((prev) => ({
      ...prev,
      [module]: { ...prev[module], ...updates },
    }));
  };

  // Get only enabled tiers for the chart
  const enabledTiers = useMemo(() => {
    return getEnabledTiers(pricingRules, moduleConfigs);
  }, [pricingRules, moduleConfigs]);

  const data = Array.from({ length: maxUsers }, (_, i) => {
    const scalingFactor = i + 1;
    const scaledConfigs = Object.fromEntries(
      Object.entries(moduleConfigs).map(([module, config]) => [
        module,
        { ...config, users: config.enabled ? Math.max(1, Math.round((config.users * scalingFactor) / 5)) : 0 },
      ])
    );

    // Create dynamic data keys based on enabled tiers only
    const tierPrices: Record<string, number | null> = {};
    enabledTiers.forEach(tier => {
      let price = 0;

      // Calculate price for each enabled module that has this tier
      for (const [module, config] of Object.entries(moduleConfigs)) {
        if (config.enabled && config.users > 0) {
          const moduleTiers = getModuleTiers(pricingRules, module);
          if (moduleTiers.includes(tier)) {
            const rule = pricingRules[module][tier];
            if (rule.orgPrice !== undefined) {
              // Fixed organizational price - doesn't scale with users
              price += rule.orgPrice;
            } else if (rule.perSeatPrice !== undefined) {
              // Handle free tier with maxUsers limit
              if (tier === 'free' || rule.perSeatPrice === 0) {
                const scaledUsers = Math.max(1, Math.round((config.users * scalingFactor) / 5));
                if (rule.maxUsers !== 'unlimited' && scaledUsers > (rule.maxUsers || 0)) {
                  price = Infinity; // Not available
                  break;
                }
                // Free tier - no cost
              } else {
                // Per-seat price - scales with user count
                const scaledUsers = Math.max(1, Math.round((config.users * scalingFactor) / 5));
                price += scaledUsers * rule.perSeatPrice;
              }
            }
          }
        }
      }

      tierPrices[tierToKey(tier)] = price === Infinity ? null : price;
    });

    return {
      users: scalingFactor,
      ...tierPrices
    };
  });

  return (
    <div className={`p-6 min-h-screen ${gradientClass}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">{title}</h1>
        <TierPricingSummary moduleConfigs={moduleConfigs} pricingRules={pricingRules} />

        {/* Flex container for PricingChart and ModuleConfigPanel */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <PricingChart
              data={data}
              maxUsers={maxUsers}
              setMaxUsers={setMaxUsers}
              tiers={enabledTiers}
              pricingRules={pricingRules}
            />
          </div>
          <div className="flex-1">
            <ModuleConfigPanel
              moduleConfigs={moduleConfigs}
              updateModuleConfig={updateModuleConfig}
            />
          </div>
        </div>

        {/* <ActiveModulesSummary moduleConfigs={moduleConfigs} /> */}
      </div>
    </div>
  );

}