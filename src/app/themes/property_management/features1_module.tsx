
// components/PropertyManagementSuite.tsx
import React from 'react';


// types/index.ts
type FeatureCard = {
    icon: React.ReactNode;
    title: string;
    description: string;
}



type FeatureCardProps = {
    feature: FeatureCard;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    return (
        <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 transition-colors duration-300">
            <div className="mb-6 text-4xl">
                {feature.icon}
            </div>
            <h3 className="text-white text-xl font-semibold mb-4">
                {feature.title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
                {feature.description}
            </p>
        </div>
    );
};



// Icons (using emoji for simplicity, but you can replace with your preferred icon library)
const features: FeatureCard[] = [
    {
        icon: '👥',
        title: 'Tenant Management',
        description: 'Complete tenant profiles, application processing, background checks, and communication history. Automated lease renewals and tenant portal access.'
    },
    {
        icon: '💰',
        title: 'Rent Collection & Accounting',
        description: 'Automated rent collection, late fee tracking, financial reporting, and integration with accounting software. Real-time dashboard analytics.'
    },
    {
        icon: '🔧',
        title: 'Maintenance Coordination',
        description: 'Work order management, vendor coordination, maintenance scheduling, and property inspection tracking. Mobile-friendly for field teams.'
    },
    {
        icon: '📋',
        title: 'Property Portfolio',
        description: 'Centralized property database, unit management, lease tracking, and performance analytics. Custom fields for property-specific data.'
    },
    {
        icon: '⚖️',
        title: 'Legal & Compliance',
        description: 'Document management, lease templates, compliance tracking, and automated legal notices. Integration with legal databases.'
    },
    {
        icon: '📱',
        title: 'Mobile & Automation',
        description: 'Mobile apps for tenants and staff, workflow automation, notification systems, and API integrations with third-party services.'
    }
];

export  const PropertyManagementFeatures1: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Complete Property Management Suite
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Everything you need to run a successful property management business,
                        built on our flexible low-code platform
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </div>
    );
};
