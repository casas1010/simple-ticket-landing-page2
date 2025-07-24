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

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const handleCanPlay = () => {
  //     const playWatcher = setInterval(() => {
  //       if (video.currentTime >= 0.1) {
  //         clearInterval(playWatcher);
  //         setIsReady(true);
  //       }
  //     }, 50);
  //   };

  //   video.addEventListener('canplay', handleCanPlay);

  //   // Fallback in case video never reaches .1s
  //   const fallbackTimeout = setTimeout(() => {
  //     setIsReady(true);
  //   }, 3000);

  //   return () => {
  //     video.removeEventListener('canplay', handleCanPlay);
  //     clearTimeout(fallbackTimeout);
  //   };
  // }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      {/* <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://cdn.jsdelivr.net/gh/casas1010/background-video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {isReady && (
        <div className="relative z-10 w-full h-full overflow-y-auto">
          <Header title='Simple Ticket!'/>
          <GetStarted />
          {/* <PlatformFeatures sub_title="" /> */}
          {/* <Modules></Modules> */}

        </div>

      )}

    </div>
  );
}