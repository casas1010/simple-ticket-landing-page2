"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Home, Play } from 'lucide-react';
import Header from '@/app/components/header';
import GetStarted from '@/app/themes/raw/init';
import PlatformFeatures from '../../components/platform_features';
import Modules from './modules_ui';

export default function RawPage() {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(true);

  return (
      <GetStarted />
    // <div className="relative w-full h-screen overflow-hidden">
    //     <div className="relative z-10 w-full h-full overflow-y-auto">
    //       <Header title='Simple Ticket!'/>
    //       <GetStarted />
    //       {/* <PlatformFeatures sub_title="" /> */}
    //       {/* <Modules></Modules> */}

    //     </div>

    // </div>
  );
}