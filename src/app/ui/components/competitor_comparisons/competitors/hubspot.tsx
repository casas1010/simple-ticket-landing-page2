import PricingComparison from "../grapher/grapher";

const features = {
  // Free tier features
  FORMS_LANDING_PAGES: 'Forms and landing pages',
  EMAIL_MARKETING: 'Email marketing',
  LIVE_CHAT: 'Live chat and conversational bots',
  REPORTING_DASHBOARDS: 'Reporting dashboards',
  MAX_USERS_2: 'Maximum 2 users',
  
  // Starter tier features
  NO_HUBSPOT_BRANDING: 'No HubSpot branding',
  AD_MANAGEMENT: 'Ad management',
  BASIC_AUTOMATION: 'Basic automation',
  FB_MESSENGER: 'Facebook Messenger integration',
  CTAS: 'Calls-to-action (CTAs)',
  
  // Professional tier features
  ADVANCED_AUTOMATION: 'Advanced automation',
  SEO_RECOMMENDATIONS: 'SEO recommendations',
  SOCIAL_MEDIA_MANAGEMENT: 'Social media management',
  ADVANCED_REPORTING: 'Advanced reporting',
  
  // Additional features for comprehensive tiers
  CUSTOM_REPORTING: 'Custom reporting and analytics',
  A_B_TESTING: 'A/B testing',
  LEAD_SCORING: 'Lead scoring',
  WORKFLOW_AUTOMATION: 'Workflow automation',
  CUSTOM_PROPERTIES: 'Custom properties',
  INTEGRATION_PLATFORM: 'Integration platform access',
  ADVANCED_PERMISSIONS: 'Advanced user permissions',
  API_ACCESS: 'API access',
  PHONE_SUPPORT: '24/7 phone support',
  ONBOARDING: 'Dedicated onboarding',
  ACCOUNT_MANAGEMENT: 'Dedicated account management',
  SLA_GUARANTEE: 'SLA guarantee',
  SINGLE_SIGN_ON: 'Single sign-on (SSO)',
  ADVANCED_SECURITY: 'Advanced security features'
};

/* ---------------- PRICING RULES ---------------- */
const pricingRules: Record<string, Record<string, any>> = {
  Marketing: {
    free: { 
      perSeatPrice: 0, 
      maxUsers: 2,
      features: [
        features.FORMS_LANDING_PAGES,
        features.EMAIL_MARKETING,
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.MAX_USERS_2
      ]
    },
    starter: { 
      perSeatPrice: 9,
      features: [
        features.FORMS_LANDING_PAGES,
        features.EMAIL_MARKETING,
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.AD_MANAGEMENT,
        features.BASIC_AUTOMATION,
        features.FB_MESSENGER,
        features.CTAS
      ]
    },
    professional: { 
      orgPrice: 800, 
      includedSeats: 3, 
      perSeatPrice: 45,
      features: [
        features.FORMS_LANDING_PAGES,
        features.EMAIL_MARKETING,
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.AD_MANAGEMENT,
        features.ADVANCED_AUTOMATION,
        features.FB_MESSENGER,
        features.CTAS,
        features.SEO_RECOMMENDATIONS,
        features.SOCIAL_MEDIA_MANAGEMENT,
        features.ADVANCED_REPORTING,
        features.CUSTOM_REPORTING,
        features.A_B_TESTING,
        features.LEAD_SCORING
      ]
    }
  },
  Sales: {
    free: { 
      perSeatPrice: 0, 
      maxUsers: 2,
      features: [
        features.REPORTING_DASHBOARDS,
        features.LIVE_CHAT,
        features.EMAIL_MARKETING,
        features.MAX_USERS_2
      ]
    },
    starter: { 
      perSeatPrice: 9,
      features: [
        features.REPORTING_DASHBOARDS,
        features.LIVE_CHAT,
        features.EMAIL_MARKETING,
        features.NO_HUBSPOT_BRANDING,
        features.BASIC_AUTOMATION,
        features.CTAS,
        features.LEAD_SCORING
      ]
    },
    professional: { 
      perSeatPrice: 90,
      features: [
        features.REPORTING_DASHBOARDS,
        features.LIVE_CHAT,
        features.EMAIL_MARKETING,
        features.NO_HUBSPOT_BRANDING,
        features.ADVANCED_AUTOMATION,
        features.CTAS,
        features.LEAD_SCORING,
        features.ADVANCED_REPORTING,
        features.CUSTOM_REPORTING,
        features.WORKFLOW_AUTOMATION,
        features.CUSTOM_PROPERTIES,
        features.API_ACCESS
      ]
    }
  },
  Service: {
    free: { 
      perSeatPrice: 0, 
      maxUsers: 2,
      features: [
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.EMAIL_MARKETING,
        features.MAX_USERS_2
      ]
    },
    starter: { 
      perSeatPrice: 9,
      features: [
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.EMAIL_MARKETING,
        features.NO_HUBSPOT_BRANDING,
        features.BASIC_AUTOMATION,
        features.FB_MESSENGER
      ]
    },
    professional: { 
      perSeatPrice: 90,
      features: [
        features.LIVE_CHAT,
        features.REPORTING_DASHBOARDS,
        features.EMAIL_MARKETING,
        features.NO_HUBSPOT_BRANDING,
        features.ADVANCED_AUTOMATION,
        features.FB_MESSENGER,
        features.ADVANCED_REPORTING,
        features.CUSTOM_REPORTING,
        features.WORKFLOW_AUTOMATION,
        features.PHONE_SUPPORT,
        features.SLA_GUARANTEE
      ]
    }
  },
  Content: {
    free: { 
      perSeatPrice: 0, 
      maxUsers: 2,
      features: [
        features.FORMS_LANDING_PAGES,
        features.REPORTING_DASHBOARDS,
        features.MAX_USERS_2
      ]
    },
    starter: { 
      perSeatPrice: 9,
      features: [
        features.FORMS_LANDING_PAGES,
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.SEO_RECOMMENDATIONS,
        features.BASIC_AUTOMATION
      ]
    },
    professional: { 
      orgPrice: 450, 
      includedSeats: 3, 
      perSeatPrice: 45,
      features: [
        features.FORMS_LANDING_PAGES,
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.SEO_RECOMMENDATIONS,
        features.ADVANCED_AUTOMATION,
        features.SOCIAL_MEDIA_MANAGEMENT,
        features.ADVANCED_REPORTING,
        features.CUSTOM_REPORTING,
        features.A_B_TESTING,
        features.WORKFLOW_AUTOMATION,
        features.CUSTOM_PROPERTIES
      ]
    }
  },
  Operations: {
    free: { 
      perSeatPrice: 0, 
      maxUsers: 2,
      features: [
        features.REPORTING_DASHBOARDS,
        features.MAX_USERS_2
      ]
    },
    starter: { 
      perSeatPrice: 9,
      features: [
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.BASIC_AUTOMATION,
        features.CUSTOM_PROPERTIES
      ]
    },
    professional: { 
      orgPrice: 720, 
      includedSeats: 1, 
      perSeatPrice: 45,
      features: [
        features.REPORTING_DASHBOARDS,
        features.NO_HUBSPOT_BRANDING,
        features.ADVANCED_AUTOMATION,
        features.CUSTOM_PROPERTIES,
        features.ADVANCED_REPORTING,
        features.CUSTOM_REPORTING,
        features.WORKFLOW_AUTOMATION,
        features.INTEGRATION_PLATFORM,
        features.ADVANCED_PERMISSIONS,
        features.API_ACCESS,
        features.ONBOARDING,
        features.ACCOUNT_MANAGEMENT,
        features.SINGLE_SIGN_ON,
        features.ADVANCED_SECURITY
      ]
    }
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