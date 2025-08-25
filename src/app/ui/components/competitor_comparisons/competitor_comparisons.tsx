import { useState } from "react";
import HubSpot from "./competitors/hubspot";
import { FaSalesforce } from "react-icons/fa";
import SalesForce from "./competitors/salesforce";
import Shopify from "./competitors/shopify";

export default function CompetitorComparison() {
  const competitors = [
    { title: "HubSpot", component: <HubSpot /> },
    { title: "Salesforce", component: <SalesForce/>  },
    { title: "Shopify", component: <Shopify /> },
  ];

  const [active, setActive] = useState(competitors[0].title);

  return (
    <div className="flex flex-col items-center p-8">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {competitors.map((c) => (
          <button
            key={c.title}
            onClick={() => setActive(c.title)}
            className={`px-4 py-2 -mb-px border-b-2 font-medium ${
              active === c.title
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-7xl  text-center">
        {competitors.map(
          (c) => active === c.title && <div key={c.title}>{c.component}</div>
        )}
      </div>
    </div>
  );
}