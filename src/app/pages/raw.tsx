// import React, { useState } from 'react';
// import Header from '@/app/components/header/header';
// import StarBackground from '@/app/components/backgrounds/star';
// import PlatformFeatures from '@/app/components/platform_features';
// import { ModuleFeatures } from '@/app/components/lists/modules';
// import { Module } from '@/app/core/types/module';
// import { useIsMobile } from '@/app/core/context/mobile_context';


// import ModulesOrbit from '@/app/components/modules_orbit/modules_orbit';
// import { MODULES } from '../core/data/modules';
// import { PLATFORM_FEATURES } from '../core/data/features';
// import TitleAndIcon from '../components/title_and_icon';

// export default function RawPage() {
//   const [module, setModule] = useState<Module | null>(null);

//   const mainText = module?.main_description ?? 'Discover the ideal data management system for your';
//   const highlight = module?.main_description_highlight ?? 'organization';
//   const subText = module?.sub_description ?? '';

//   const getTitle = () => (module ? `Simple ${module.title}` : 'Simple Ticket');

//   return (
//     <div className="bg-[#35495f] relative w-full overflow-hidden">
//       <StarBackground starColor={module?.gradient} />
//       <Header title={getTitle()} />

//       <TitleAndIcon
//         mainText={mainText}
//         highlight={highlight}
//         subText={subText}
//         setModule={setModule}
//         component={<ModulesOrbit setModule={setModule} />} // <-- ADDED
//       />

//       <ModuleFeatures
//         title="Modules"
//         description="Start from one of our pre build modules or create your own"
//         features={MODULES}
//         open_page={true}
//       />

//       <PlatformFeatures sub_title="" />
//       <ModuleFeatures
//         title="Built for simplicity"
//         description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
//         features={PLATFORM_FEATURES}
//       />
//     </div>
//   );
// }